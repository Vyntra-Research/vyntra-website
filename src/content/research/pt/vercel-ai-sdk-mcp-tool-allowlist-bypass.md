-----------
# Bypass de allowlist de tools via prototype chain no MCP Client do Vercel AI SDK
Como uma checagem de propriedades herdadas permitia expor e executar tools MCP não aprovadas.
@rafabd1
2026-07-10
slug: vercel-ai-sdk-mcp-tool-allowlist-bypass
-----------

## Resumo

Recentemente reportei uma vulnerabilidade no MCP client do Vercel AI SDK que permitia que um MCP server expusesse e executasse tools que não tinham sido aprovadas explicitamente pela aplicação.

A falha foi classificada como Medium, com severidade 6.3, e já foi corrigida publicamente. Também solicitei a atribuição de uma CVE ao MITRE, mas ela ainda não foi atribuída no momento da publicação deste artigo.

## Cenário

O AI SDK possui suporte a MCP, o Model Context Protocol, usado para conectar modelos de IA a ferramentas e serviços externos.

Na prática, um MCP server anuncia uma lista de tools disponíveis e a aplicação decide quais delas serão fornecidas ao modelo.

Essas tools podem representar operações simples, como buscar informações de um cliente, mas também podem executar ações mais sensíveis, como acessar arquivos, consultar sistemas internos, controlar um navegador, modificar tickets, chamar APIs privadas, exportar dados ou executar comandos.

O MCP client do AI SDK possui um modo automático, onde todas as tools anunciadas pelo servidor são carregadas, e um modo mais controlado usando `schemas`.

Com `schemas`, o developer define explicitamente quais tools daquele MCP server podem ser expostas ao modelo:

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

Nesse exemplo, a aplicação está dizendo que deseja permitir somente a tool `allowedCustomerLookup`.

Mesmo que o MCP server anuncie outras tools em sua resposta de `tools/list`, o AI SDK deveria ignorar qualquer uma que não tivesse sido definida dentro de `schemas`.

Por exemplo, se o servidor anunciasse:

```txt
allowedCustomerLookup
constructor
```

o esperado seria que apenas `allowedCustomerLookup` fosse retornada.

Mas `constructor` também passava pela allowlist.

## Bypass

O problema estava na forma como o AI SDK verificava se o nome de uma tool estava presente dentro de `schemas`.

A checagem era feita usando o operador `in` do JavaScript:

```ts
if (schemas !== 'automatic' && !(name in schemas)) {
  continue
}
```

A intenção era simples: se a tool anunciada pelo MCP server não estiver em `schemas`, pula ela.

O problema é que `name` vinha diretamente da resposta `tools/list` do MCP server, enquanto a checagem usada não distinguia propriedades definidas pelo developer de propriedades herdadas pelo objeto.

> Em JavaScript, o operador `in` retorna `true` não apenas quando uma propriedade foi definida diretamente no objeto, mas também quando ela existe em algum ponto da sua prototype chain.
>
> Isso significa que um objeto pode responder positivamente para certas propriedades mesmo que elas nunca tenham sido declaradas dentro dele.

A aplicação podia ter apenas esta propriedade:

```js
const schemas = {
  allowedCustomerLookup: {
    inputSchema: z.object({
      customerId: z.string(),
    }),
  },
}
```

Mesmo assim, a expressão abaixo retornava `true`:

```js
"constructor" in schemas
```

Isso acontece porque objetos normais em JavaScript herdam de `Object.prototype`, e `constructor` pode ser resolvido através dessa cadeia de herança.

> O operador `in` não retorna um objeto. Ele retorna apenas `true` ou `false`.
>
> O valor herdado aparece depois, quando o código acessa `schemas["constructor"]`. Como essa key não existe diretamente em `schemas`, o JavaScript continua procurando pela prototype chain e encontra a propriedade herdada `constructor`.

Na prática, a checagem de allowlist deixava a tool passar:

```ts
"constructor" in schemas // true
```

Depois disso, o código tentava acessar o schema correspondente:

```ts
schemas[name].inputSchema
```

Com `name` igual a `constructor`, isso se tornava:

```ts
schemas["constructor"].inputSchema
```

A aplicação nunca tinha definido um schema para essa tool. Mesmo assim, `schemas["constructor"]` não era `null` nem `undefined`, porque o acesso resolvia para uma propriedade herdada.

O `inputSchema` resultante era `undefined`, mas isso não impedia a tool de continuar pelo fluxo. O AI SDK convertia esse valor em um schema vazio e ainda enviava a tool para o modelo.

O fluxo vulnerável era basicamente:

```txt
MCP server anuncia uma tool chamada constructor

aplicação chama client.tools({ schemas })

schemas contém apenas allowedCustomerLookup

o AI SDK avalia "constructor" in schemas

a expressão retorna true por causa da prototype chain

constructor passa pela allowlist

a tool é enviada para generateText

o modelo recebe constructor como uma function tool disponível

quando o modelo chama a tool, o AI SDK executa MCP tools/call
```

Então o problema não era apenas uma key inesperada aparecer no objeto retornado pelo client.

A tool não aprovada passava pelo fluxo completo, era apresentada ao modelo e podia ser executada normalmente.

## Prototype chain e allowlists

Essa classe de falha aparece quando objetos JavaScript são usados como mapas ou allowlists, mas a aplicação verifica a existência das entradas usando uma operação que também considera propriedades herdadas.

> Objetos JavaScript comuns não são mapas completamente vazios.
>
> Mesmo um objeto criado como `{}` normalmente possui uma prototype chain e herda propriedades como `constructor`, `toString`, `valueOf` e outras.

Isso geralmente não é um problema durante o uso normal da linguagem. A diferença passa a ser relevante quando as keys do objeto representam decisões de segurança.

Uma allowlist precisa responder:

```txt
essa entrada foi definida explicitamente pela aplicação?
```

Mas a checagem usada pelo AI SDK respondia:

```txt
esse nome pode ser resolvido como alguma propriedade acessível neste objeto?
```

Essas duas perguntas parecem parecidas, mas não são equivalentes.

No caso da falha, a primeira pergunta deveria retornar `false` para `constructor`, porque o developer nunca aprovou essa tool.

A segunda retornava `true`, porque `constructor` existia na prototype chain.

Para verificar se uma propriedade pertence diretamente a um objeto, o JavaScript possui mecanismos próprios, como:

```ts
Object.hasOwn(schemas, name)
```

ou:

```ts
Object.prototype.hasOwnProperty.call(schemas, name)
```

> Uma own-property check ignora as propriedades herdadas e verifica somente as keys realmente presentes no objeto.
>
> Em uma allowlist, isso garante que apenas entradas adicionadas explicitamente pelo developer sejam consideradas aprovadas.

Esse foi o ponto central da falha: uma checagem de resolução de propriedade estava sendo usada como uma checagem de autorização.

## Impacto

O impacto era um bypass da allowlist explícita de tools MCP.

Um cenário afetado seria uma aplicação conectada a um MCP server externo, selecionado por um usuário, configurado por um workspace ou compartilhado entre vários times.

A aplicação poderia confiar em `client.tools({ schemas })` para reduzir todas as tools disponibilizadas pelo servidor a um pequeno conjunto aprovado:

```txt
MCP server possui várias tools

aplicação permite apenas uma tool de consulta

somente essa tool deveria ser enviada ao modelo
```

Um MCP server malicioso, porém, poderia anunciar uma tool chamada `constructor`.

Mesmo sem essa tool estar definida em `schemas`, o AI SDK tratava o nome como presente na allowlist, enviava sua definição ao modelo e permitia sua execução através de `tools/call`.

Isso é relevante porque MCP tools não representam apenas conteúdo textual ou instruções para o modelo. Elas podem produzir efeitos reais em outros sistemas.

Dependendo da aplicação, uma tool inesperada poderia acessar dados internos, consultar contas, ler arquivos, modificar recursos, exportar informações, navegar em páginas autenticadas ou acionar operações sensíveis.

O servidor não precisava explorar prompt injection, quebrar o parser do protocolo ou interferir diretamente no modelo.

Bastava controlar o nome de uma tool retornada por `tools/list` e escolher uma propriedade herdada pelo prototype do JavaScript.

No caso utilizado para demonstrar a falha, o nome foi:

```txt
constructor
```

Mas o ponto mais interessante não é especificamente essa propriedade. É a classe do bug.

Sempre que dados não confiáveis são comparados contra objetos usados como allowlists, permissões ou registries, a diferença entre uma propriedade própria e uma propriedade herdada pode acabar se transformando em bypass.

No fim, a aplicação queria dizer:

```txt
exponha apenas as tools que eu defini
```

Mas a implementação verificava:

```txt
exponha qualquer tool cujo nome possa ser resolvido dentro desse objeto
```

Quando o nome é controlado pelo outro lado da fronteira de confiança, essa diferença é suficiente para transformar prototype inheritance em execução de uma tool não aprovada.
