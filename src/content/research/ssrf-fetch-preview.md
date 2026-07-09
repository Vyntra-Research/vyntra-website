-----------
# SSRF em endpoints de fetch de imagens
Como um parâmetro de URL simples abriu acesso à rede interna do servidor através de renderização remota de imagens.
@rafabd1
2025-06-10
-----------

## Resumo

Durante um pentest de API, um endpoint de "pré-visualização de link" (link preview) aceitava uma URL arbitrária e devolvia metadados OG (Open Graph) da página. A funcionalidade parecia inofensiva — até que percebi que o servidor buscava a URL sem qualquer restrição de esquema ou destino.

## O fluxo

O endpoint esperava algo como:

```http
POST /api/fetch-preview
Content-Type: application/json

{ "url": "https://example.com" }
```

O servidor fazia a requisição usando `fetch` no backend e retornava `title`, `description` e `image`. Nenhuma validação era feita sobre o domínio ou o scheme.

## Explorando

A primeira coisa que testei foi um scheme diferente de `http`:

```json
{ "url": "file:///etc/passwd" }
```

Bloqueado — a biblioteca em uso não suportava `file://`. Mas `http://` estava liberado, então parti para o alvo clássico de SSRF: os serviços internos.

```json
{ "url": "http://169.254.169.254/latest/meta-data/" }
```

O servidor respondeu com as credenciais temporárias do IAM. O instance metadata service era alcançável a partir do processo backend.

## Encadeamento

O impacto real apareceu ao combinar o SSRF com um servidor interno de admin que escutava em `127.0.0.1:8000` sem autenticação. Através da pré-visualização, era possível ler respostas de rotas internas que nunca deveriam ser expostas:

```json
{ "url": "http://127.0.0.1:8000/admin/users" }
```

## Correção

- Validar o scheme (permitir apenas `http`/`https`).
- Resolver o host e bloquear endereços privados / loopback / link-local antes da requisição.
- Usar um egress allowlist em nível de rede, não confiar só na aplicação.

## Conclusão

Funcionalidades de "busca remota" são um vetor clássico de SSRF. A correção precisa acontecer em duas camadas: validação na aplicação e restrição de saída na rede. Confiar apenas em uma delas costuma deixar brechas.
