-----------
# Prototype-Based Tool Allowlist Bypass in Vercel AI SDK MCP Client
How an inherited-property check allowed unapproved MCP tools to be exposed and executed.
@rafabd1
2026-07-10
slug: vercel-ai-sdk-mcp-tool-allowlist-bypass
-----------

## Summary

I recently reported a vulnerability in the Vercel AI SDK MCP client that allowed an MCP server to expose and execute tools that had not been explicitly approved by the application.

The issue was classified as Medium, with a severity score of 6.3, and has already been fixed publicly. I also requested a CVE assignment from MITRE, but one had not been assigned at the time this article was published.

## Scenario

The AI SDK supports MCP, the Model Context Protocol, which is used to connect AI models to external tools and services.

In practice, an MCP server advertises a list of available tools and the application decides which of them are provided to the model.

These tools may represent simple operations, such as looking up customer information, but they can also perform more sensitive actions, such as accessing files, querying internal systems, controlling a browser, modifying tickets, calling private APIs, exporting data, or running commands.

The AI SDK MCP client has an automatic mode, where every tool advertised by the server is loaded, and a more controlled mode using `schemas`.

With `schemas`, the developer explicitly defines which tools from that MCP server may be exposed to the model:

```js
const schemas = {
  allowedCustomerLookup: {
    inputSchema: z.object({
      customerId: z.string(),
    }),
  },
}

const tools = await client.tools({ schemas })
```

In this example, the application is saying that it wants to allow only the `allowedCustomerLookup` tool.

Even if the MCP server advertises other tools in its `tools/list` response, the AI SDK should ignore any tool that was not defined in `schemas`.

For example, if the server advertised:

```txt
allowedCustomerLookup
constructor
```

the expected result would be for only `allowedCustomerLookup` to be returned.

But `constructor` also passed the allowlist.

## Bypass

The issue was in how the AI SDK checked whether a tool name was present in `schemas`.

The check used JavaScript's `in` operator:

```ts
if (schemas !== 'automatic' && !(name in schemas)) {
  continue
}
```

The intent was simple: if the tool advertised by the MCP server is not in `schemas`, skip it.

The problem is that `name` came directly from the MCP server's `tools/list` response, while the check did not distinguish properties defined by the developer from properties inherited by the object.

> In JavaScript, the `in` operator returns `true` not only when a property is defined directly on an object, but also when it exists anywhere in that object's prototype chain.
>
> This means an object can answer positively for certain properties even when they were never declared inside it.

The application could have only this property:

```js
const schemas = {
  allowedCustomerLookup: {
    inputSchema: z.object({
      customerId: z.string(),
    }),
  },
}
```

Even so, the expression below returned `true`:

```js
"constructor" in schemas
```

This happens because regular JavaScript objects inherit from `Object.prototype`, and `constructor` can be resolved through that inheritance chain.

> The `in` operator does not return an object. It returns only `true` or `false`.
>
> The inherited value appears later, when the code accesses `schemas["constructor"]`. Since that key does not exist directly in `schemas`, JavaScript keeps looking through the prototype chain and finds the inherited `constructor` property.

In practice, the allowlist check let the tool through:

```ts
"constructor" in schemas // true
```

The code then tried to access the corresponding schema:

```ts
schemas[name].inputSchema
```

With `name` set to `constructor`, this became:

```ts
schemas["constructor"].inputSchema
```

The application had never defined a schema for that tool. Even so, `schemas["constructor"]` was neither `null` nor `undefined`, because the access resolved to an inherited property.

The resulting `inputSchema` was `undefined`, but that did not stop the tool from continuing through the flow. The AI SDK converted that value into an empty schema and still passed the tool to the model.

The vulnerable flow was essentially:

```txt
MCP server advertises a tool named constructor

application calls client.tools({ schemas })

schemas contains only allowedCustomerLookup

the AI SDK evaluates "constructor" in schemas

the expression returns true because of the prototype chain

constructor passes the allowlist

the tool is sent to generateText

the model receives constructor as an available function tool

when the model calls the tool, the AI SDK executes MCP tools/call
```

So the issue was not merely an unexpected key appearing in the object returned by the client.

The unapproved tool passed through the complete flow, was presented to the model, and could be executed normally.

## Prototype chain and allowlists

This class of issue appears when JavaScript objects are used as maps or allowlists, but the application checks for entries using an operation that also considers inherited properties.

> Regular JavaScript objects are not completely empty maps.
>
> Even an object created as `{}` usually has a prototype chain and inherits properties such as `constructor`, `toString`, `valueOf`, and others.

This is usually not a problem in normal language use. The distinction becomes relevant when object keys represent security decisions.

An allowlist needs to answer:

```txt
was this entry explicitly defined by the application?
```

But the check used by the AI SDK answered:

```txt
can this name be resolved as an accessible property on this object?
```

Those two questions may look similar, but they are not equivalent.

In this case, the first question should return `false` for `constructor`, because the developer never approved that tool.

The second returned `true`, because `constructor` existed in the prototype chain.

To verify that a property belongs directly to an object, JavaScript provides dedicated mechanisms, such as:

```ts
Object.hasOwn(schemas, name)
```

or:

```ts
Object.prototype.hasOwnProperty.call(schemas, name)
```

> An own-property check ignores inherited properties and checks only the keys that are actually present on the object.
>
> In an allowlist, this ensures that only entries explicitly added by the developer are considered approved.

That was the core of the issue: a property-resolution check was used as an authorization check.

## Impact

The impact was a bypass of the explicit MCP tool allowlist.

An affected scenario would be an application connected to an external MCP server selected by a user, configured by a workspace, or shared across several teams.

The application could rely on `client.tools({ schemas })` to reduce all tools provided by the server to a small approved set:

```txt
MCP server has multiple tools

application allows only one lookup tool

only that tool should be sent to the model
```

However, a malicious MCP server could advertise a tool called `constructor`.

Even though that tool was not defined in `schemas`, the AI SDK treated the name as present in the allowlist, sent its definition to the model, and allowed its execution through `tools/call`.

This matters because MCP tools do not represent only textual content or instructions for the model. They can create real effects in other systems.

Depending on the application, an unexpected tool could access internal data, query accounts, read files, modify resources, export information, navigate authenticated pages, or trigger sensitive operations.

The server did not need to exploit prompt injection, break the protocol parser, or interfere directly with the model.

It only needed to control the name of a tool returned by `tools/list` and choose a property inherited through JavaScript's prototype chain.

In the case used to demonstrate the issue, the name was:

```txt
constructor
```

But the most important point is not that specific property. It is the bug class.

Whenever untrusted data is compared against objects used as allowlists, permissions, or registries, the difference between an own property and an inherited property can become a bypass.

In the end, the application meant to say:

```txt
expose only the tools I defined
```

But the implementation checked:

```txt
expose any tool whose name can be resolved inside this object
```

When the name is controlled by the other side of the trust boundary, that difference is enough to turn prototype inheritance into execution of an unapproved tool.
