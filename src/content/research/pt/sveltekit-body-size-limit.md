-----------
# Bypass do BODY_SIZE_LIMIT no SvelteKit adapter-node via requisições chunked
Como requisições chunked sem Content-Length driblavam o limite de tamanho de body do adapter-node do SvelteKit (CVE-2026-40073).
@rafabd1
2026-04-30
slug: sveltekit-body-size-limit-bypass-chunked
-----------

## O que acontecia

Recentemente reportei uma vulnerabilidade no SvelteKit (Vercel OSS) relacionada ao `BODY_SIZE_LIMIT` no `adapter-node`. O report acabou marcado como duplicado, com o original recebendo a CVE (**CVE-2026-40073**). Mas resolvi escrever esse writeup pra compartilhar o achado.

O limite de tamanho de body (`BODY_SIZE_LIMIT`, padrão 512 KB) não era respeitado quando a requisição vinha em modo chunked (com `Transfer-Encoding: chunked`) e sem o header `Content-Length`.

Requisições grandes com `Content-Length` eram bloqueadas como esperado. Mas a mesma quantidade de dados, enviada em chunks, passava direto e era processada normalmente pelo servidor. Isso criava uma brecha entre o que a documentação prometia e o comportamento real.

## Por que o bypass funcionava

No código da função `get_raw_body()` (em `packages/kit/src/exports/node/index.js`), a verificação era mais ou menos assim:

```javascript
const content_length = Number(headers['content-length']);

if (body_size_limit !== undefined && content_length > body_size_limit) {
  // rejeita
}

// durante a leitura dos chunks
size += chunk.length;
if (size > content_length) {
  // rejeita
}
```

Quando não tinha `Content-Length`, o `content_length` virava `NaN` (Not a Number). Em JavaScript, qualquer comparação envolvendo `NaN` retorna `false`. Então tanto `NaN > body_size_limit` quanto `size > NaN` davam falso, e o código continuava lendo o stream sem nunca aplicar o limite configurado.

A documentação do `adapter-node` dizia que o limite valia "incluindo enquanto faz streaming", mas na prática existia essa exceção com requisições chunked.

## Impacto

Em endpoints que precisam processar bodies (webhooks, ingestão de eventos, uploads de JSON etc.), isso permitia que um atacante forçasse o servidor a ler e processar payloads muito maiores que o limite. O resultado era um consumo maior de CPU e memória por requisição, tornando ataques de Denial of Service mais eficazes.

## Testes que fiz

Montei dois PoCs:

- Um bem simples, só pra confirmar o bypass (requisição pequena → OK, grande com `Content-Length` → bloqueada, grande chunked → aceita).
- Outro mais realista, simulando um webhook que lê o body, faz parse JSON e roda um pouco de processamento de CPU. Aí dava pra medir claramente a diferença de recursos consumidos.

A diferença era bem visível: no modo chunked o container chegava perto de 100% de CPU e usava muito mais RAM, enquanto o normal bloqueava antes de chegar na aplicação.

## Status

A equipe do SvelteKit corrigiu o problema no commit [3202ed6](https://github.com/sveltejs/kit/commit/3202ed6c98f9e8d86bf0c4c7ad0f2e273e5e3b95).

- **CVE-2026-40073** — [https://nvd.nist.gov/vuln/detail/CVE-2026-40073](https://nvd.nist.gov/vuln/detail/CVE-2026-40073)
