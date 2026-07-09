-----------
# Bypass de rate-limit em APIs GraphQL via aliasing de campos
Um rate-limit baseado em contagem de operações pode ser derrotado enviando dezenas de tentativas dentro de uma única mutation usando aliases.
@rafabd1
2025-06-02
-----------

## Contexto

O alvo usava GraphQL para o fluxo de login. Havia um rate-limit agressivo: após 10 tentativas falhas por IP, a conta era bloqueada temporariamente. A ideia era descobrir senhas por enumeração, mas o bloqueio impedia qualquer brute-force direto.

## O problema do rate-limit em GraphQL

O rate-limit contava **operações por requisição**. Em REST, uma requisição = uma tentativa. Em GraphQL, uma única requisição pode conter múltiplas operações usando **aliases** — e o contador tratava a requisição inteira como uma operação.

## A query

Em vez de enviar uma mutation por senha:

```graphql
mutation { login(input: { user: "admin", pass: "123456" }) { token } }
```

Enviei dezenas de tentativas com aliases diferentes na mesma requisição:

```graphql
mutation {
  a1: login(input: { user: "admin", pass: "123456" }) { token }
  a2: login(input: { user: "admin", pass: "qwerty" }) { token }
  a3: login(input: { user: "admin", pass: "password" }) { token }
  # ... 50 variações
}
```

Cada campo era resolvido de forma independente, e o servidor processava todas as tentativas — mas o rate-limit via apenas **uma** requisição.

## Impacto

Isso transformou um mecanismo de proteção que parecia sólido em algo inútil. Com 50 tentativas por requisição, e nenhuma contagem real, a enumeração voltava a ser viável.

## Correção

- Rate-limit por **custo**, não por contagem de requisições. O Apollo Server e outros suportam cost analysis por campo.
- Bloquear ou limitar aliases em mutations sensíveis.
- Detectar múltiplas operações repetidas com argumentos variando no mesmo payload.

## Lição

GraphQL muda a relação entre "requisição" e "operação". Qualquer controle de segurança que conte requisições em vez de custo real está sujeito a esse tipo de bypass. Sempre meça o que o servidor realmente executa, não o que chega pela rede.
