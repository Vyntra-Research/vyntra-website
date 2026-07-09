-----------
# IDOR em endpoints de export de relatórios
Um identificador sequencial em uma rota de download permitia acessar relatórios de outros usuários sem qualquer verificação de propriedade.
@rafabd1
2025-05-20
-----------

## Resumo

IDOR (Insecure Direct Object Reference) é uma das vulnerabilidades mais comuns — e continua funcionando porque, por trás do nome técnico, há um erro simples: o servidor confia em um identificador enviado pelo cliente sem confirmar quem está pedindo.

## O endpoint

A aplicação permitia exportar relatórios em PDF. A URL de download era:

```text
GET /api/reports/export/1042/download
```

O número `1042` era o ID do relatório. Ao trocar por `1041` ou `1043`, o servidor entregava o PDF de outro usuário, sem checar se o solicitante era o dono.

## Por que acontece

O pattern é quase sempre o mesmo:

```ts
app.get("/api/reports/export/:id/download", async (req, res) => {
  const report = await Report.findById(req.params.id);
  return res.send(report.file); // sem checar req.user
});
```

A busca é feita direto pelo ID. Falta a verificação de autorização.

## Detecção

O teste é direto: criei um relatório com a conta A, peguei o ID, e acessei a partir da conta B. O PDF carregou. Depois varri uma faixa de IDs sequenciais e vários pertenciam a outros usuários.

## Correção

```ts
const report = await Report.findOne({
  _id: req.params.id,
  ownerId: req.user.id, // escopo por dono
});
```

A regra geral: **toda consulta que toca dados de usuário deve ser escopada pelo dono**. O ID na URL nunca é prova de propriedade.

## Conclusão

IDOR não é um problema de ID, é um problema de autorização. A correção não está em esconder ou embaralhar identificadores, mas em validar, no servidor, que quem pede tem direito ao que está pedindo.
