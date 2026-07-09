-----------
# Next.js Vulnerability: Accessing Protected Static Routes in App Router via RSC Segment Artifacts
An internal build artifact in Next.js let attackers reach content protected by proxy/middleware without authentication (CVE-2026-44575).
@rafabd1
2026-06-04
slug: nextjs-rsc-segment-protected-routes
-----------

## Summary

Recently I reported a vulnerability in Next.js that allows access to protected content from static routes in the App Router even when blocked by `proxy.js` or middleware. The flaw was assigned **CVE-2026-44575**, and my report ended up being marked as a duplicate of the original submission from a few weeks earlier.

## Scenario

The App Router introduced a routing model where each page can be served in different ways depending on the context: the canonical URL, the `.rsc` version for client-side navigation, and the segment RSC artifacts. In practice, a single route like `/premium-report` has multiple public entrypoints that the framework automatically generates during the build.

The pattern recommended in the Next.js docs for protecting static routes is to use a Proxy with a list of paths:

```js
const protectedRoutes = ["/premium-report"];
const isProtectedRoute = protectedRoutes.includes(request.nextUrl.pathname);
```

With this configuration, the route correctly blocked the normal paths:

- `GET /premium-report` → **401**
- `GET /premium-report.rsc` → **401**

However, when accessing the segment RSC artifact of the same route (`/premium-report.segments/__PAGE__.segment.rsc`), the protected content was returned with **200 OK** and the full payload.

## The bypass

What happened: the Proxy received the request for `/premium-report.segments/__PAGE__.segment.rsc`, compared this path with the list of protected routes, found no exact match, and let it pass. Up to this point, nothing was wrong from the Proxy's perspective — it was doing exactly what it was told.

The problem happened afterwards. The Vercel routing layer recognized that path as a valid segment artifact and mapped it back to the RSC output of the original route `/premium-report`, delivering the complete static payload. The response headers made this very clear:

- `x-proxy-saw-pathname: /premium-report.segments/__PAGE__.segment`
- `x-matched-path: /premium-report.rsc`

This showed exactly where the inconsistency was between what the Proxy evaluated and what was actually served.

## What is RSC?

RSC (React Server Components) is React's model where components are rendered on the server and the result is sent to the client in a proprietary format, different from traditional HTML. Instead of sending plain HTML or JSON, the server sends a serialized representation of the component tree that the client knows how to interpret.

The segment artifacts returned by the vulnerable route are pieces of this RSC payload. When Next.js serializes a page, it also generates individual versions of each part of the component tree. This allows the client, during navigation, to fetch and update only the fragment of the segment that changed — without having to download the entire page payload again.

## Impact

Any Next.js application hosted on Vercel that was protecting static routes via Proxy or middleware (using a list of paths) could leak protected content without authentication — for example, paywalled pages, just by knowing the format of the artifact path.

## Fix and takeaway

The fix requires the protection to be applied to internal artifacts as well, not just canonical paths. The general lesson: **every public entrypoint the framework generates automatically has to be part of the attack surface you consider**. A proxy that protects `/premium-report` doesn't protect the application if `/premium-report.segments/...` delivers the same content through another path.
