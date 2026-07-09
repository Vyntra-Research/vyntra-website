-----------
# Vulnerabilidade no Next.js: acessando rotas estáticas protegidas no App Router via artefatos de segmento RSC
Como um artefato interno gerado pelo build do Next.js permitia acessar conteúdo protegido por proxy/middleware sem autenticação (CVE-2026-44575).
@rafabd1
2026-06-04
slug: nextjs-rsc-segment-protected-routes
-----------

## Resumo

Recentemente reportei uma vulnerabilidade no Next.js que permite acessar conteúdo protegido de rotas estáticas no App Router mesmo quando bloqueado por `proxy.js` ou middleware. A falha recebeu **CVE-2026-44575**, e meu relatório acabou marcado como duplicado da submissão original, de algumas semanas antes.

## Cenário

O App Router introduziu um modelo de rotas em que cada página pode ser servida de formas diferentes, dependendo do contexto: a URL canônica, a versão `.rsc` para navegação client-side e os artefatos de segmento RSC. Na prática, uma rota como `/premium-report` tem múltiplos entrypoints públicos que o framework gera automaticamente durante o build.

O padrão recomendado na documentação do Next.js para proteger rotas estáticas é usar um Proxy com uma lista de paths:

```js
const protectedRoutes = ["/premium-report"];
const isProtectedRoute = protectedRoutes.includes(request.nextUrl.pathname);
```

Com essa configuração, a rota bloqueava corretamente os paths normais:

- `GET /premium-report` → **401**
- `GET /premium-report.rsc` → **401**

Porém, ao acessar o artefato de segmento RSC da mesma rota (`/premium-report.segments/__PAGE__.segment.rsc`), o conteúdo protegido era retornado com **200 OK** e o payload completo.

## O bypass

O que aconteceu: o Proxy recebeu a requisição para `/premium-report.segments/__PAGE__.segment.rsc`, comparou esse path com a lista de rotas protegidas, não encontrou correspondência exata e deixou passar. Até aí, nada de errado da perspectiva do Proxy — ele fez exatamente o que foi mandado.

O problema veio depois. A camada de roteamento da Vercel reconheceu aquele path como um artefato de segmento válido e mapeou de volta para o output RSC da rota original `/premium-report`, entregando o payload estático completo. Os headers da resposta deixavam isso bem claro:

- `x-proxy-saw-pathname: /premium-report.segments/__PAGE__.segment`
- `x-matched-path: /premium-report.rsc`

Isso mostrava exatamente onde estava a inconsistência entre o que o Proxy avaliou e o que de fato foi servido.

## O que é RSC?

RSC (React Server Components) é o modelo do React em que componentes são renderizados no servidor e o resultado é enviado ao cliente num formato proprietário, diferente do HTML tradicional. Em vez de mandar HTML puro ou JSON, o servidor envia uma representação serializada da árvore de componentes que o cliente sabe interpretar.

Os artefatos de segmento retornados pela rota vulnerável são pedaços desse payload RSC. Quando o Next.js serializa uma página, ele gera versões individuais de cada parte da árvore. Isso permite que o cliente, durante a navegação, busque e atualize apenas o fragmento do segmento que mudou — sem precisar baixar o payload inteiro da página de novo.

## Impacto

Qualquer aplicação Next.js hospedada na Vercel que estivesse protegendo rotas estáticas via Proxy ou middleware (usando uma lista de paths) poderia vazar conteúdo protegido sem autenticação. Por exemplo, páginas com paywall — bastando conhecer o formato do path do artefato.

## Correção e lição

A correção exige que a proteção seja aplicada também aos artefatos internos, não só aos paths canônicos. A lição geral: **todo entrypoint público gerado automaticamente pelo framework precisa entrar na superfície de ataque que você considera**. Um proxy que protege `/premium-report` não protege a aplicação se `/premium-report.segments/...` entrega o mesmo conteúdo por outro caminho.
