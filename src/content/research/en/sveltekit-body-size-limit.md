-----------
# Bypassing BODY_SIZE_LIMIT in SvelteKit adapter-node via chunked requests
How chunked requests without Content-Length bypassed the body size limit in SvelteKit's adapter-node (CVE-2026-40073).
@rafabd1
2026-04-30
slug: sveltekit-body-size-limit-bypass-chunked
-----------

## What happened

Recently I reported a vulnerability in SvelteKit (Vercel OSS) related to `BODY_SIZE_LIMIT` in `adapter-node`. The report ended up being marked as a duplicate, with the original receiving the CVE (**CVE-2026-40073**). I decided to write this up to share the finding.

The body size limit (`BODY_SIZE_LIMIT`, default 512 KB) was not respected when the request came in chunked mode (with `Transfer-Encoding: chunked`) and without the `Content-Length` header.

Large requests with `Content-Length` were blocked as expected. But the same amount of data, sent in chunks, passed straight through and was processed normally by the server. This created a gap between what the documentation promised and the actual behavior.

## Why the bypass worked

In the code of the `get_raw_body()` function (in `packages/kit/src/exports/node/index.js`), the check looked roughly like this:

```javascript
const content_length = Number(headers['content-length']);

if (body_size_limit !== undefined && content_length > body_size_limit) {
  // reject
}

// while reading the chunks
size += chunk.length;
if (size > content_length) {
  // reject
}
```

When there was no `Content-Length`, `content_length` became `NaN` (Not a Number). In JavaScript, any comparison involving `NaN` returns `false`. So both `NaN > body_size_limit` and `size > NaN` evaluated to false, and the code kept reading the stream without ever applying the configured limit.

The `adapter-node` documentation stated the limit applied "including while streaming", but in practice there was this exception for chunked requests.

## Impact

On endpoints that need to process bodies (webhooks, event ingestion, JSON uploads, etc.), this allowed an attacker to force the server to read and process payloads far larger than the limit. The result was higher CPU and memory consumption per request, making Denial of Service attacks more effective.

## Tests I ran

I built two PoCs:

- A very simple one, just to confirm the bypass (small request → OK, large with `Content-Length` → blocked, large chunked → accepted).
- A more realistic one, simulating a webhook that reads the body, parses JSON and runs some CPU processing. That made the difference in consumed resources clearly measurable.

The difference was very visible: in chunked mode the container hit close to 100% CPU and used far more RAM, while the normal path blocked before reaching the application.

## Status

The SvelteKit team fixed the issue in commit [3202ed6](https://github.com/sveltejs/kit/commit/3202ed6c98f9e8d86bf0c4c7ad0f2e273e5e3b95).

- **CVE-2026-40073** — [https://nvd.nist.gov/vuln/detail/CVE-2026-40073](https://nvd.nist.gov/vuln/detail/CVE-2026-40073)
