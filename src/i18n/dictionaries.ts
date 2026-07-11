import type { Locale } from "./config";

const pt = {
  nav: {
    modalidades: "Modalidades",
    quemSomos: "Quem somos",
    precificacao: "Precificação",
    contato: "Contato",
    research: "Research",
    iniciar: "Iniciar",
    iniciarSoon: "Iniciar — em breve",
  },
  hero: {
    eyebrow1: "Vyntra Security",
    eyebrow2: "Pentest e pesquisa de segurança",
    titlePre: "Pentest de alto nível,",
    titleHighlight: "acessível",
    titlePost: "e prático.",
    subhead:
      "A mesma pesquisa que descobre CVEs em grandes empresas, aplicada ao seu produto — com preço transparente e contratação prática.",
    ctaPrimary: "Iniciar →",
    ctaSecondary: "Ver modalidades",
  },
  proof: {
    eyebrow: "Empresas onde encontramos vulnerabilidades",
    textBefore:
      "Grandes empresas de tecnologia onde nossos pesquisadores já encontraram falhas e reportaram",
    textAfter:
      "e vulnerabilidades. É essa mesma pesquisa que aplicamos ao seu escopo.",
  },
  assets: {
    index: "01",
    eyebrow: "Assets suportados",
    title: "Análise sobre os tipos de asset que importam para o seu produto.",
    intro:
      "A Vyntra atua sobre superfícies modernas, do frontend ao backend, do mobile à camada de inteligência artificial.",
    items: [
      { n: "01", name: "Web apps", desc: "Aplicações web, SPAs, dashboards e fluxos autenticados." },
      { n: "02", name: "APIs", desc: "REST, GraphQL, gRPC e contratos de integração." },
      { n: "03", name: "Servidores", desc: "Infraestrutura exposta, serviços e superfícies de rede." },
      { n: "04", name: "Apps mobile Android", desc: "APKs, comunicação, armazenamento e fluxos do app." },
      { n: "05", name: "Código fonte", desc: "Revisão de código, auditoria e análise estática orientada." },
      { n: "06", name: "IAs / LLMs", desc: "Prompts, agents, integrações e vetores de abuso de modelo." },
    ],
  },
  modalidades: {
    index: "02",
    eyebrow: "Modalidades",
    title: "Duas formas de contratar: um pentest dedicado ou uma assinatura recorrente.",
    subhead:
      "A diferença prática entre contratar um pentest dedicado e manter uma assinatura com análise a cada 30 dias.",
    dedicado: {
      tag: "Síncrono",
      title: "Pentest dedicado",
      desc: "Execução focada sobre um escopo definido, com janela de trabalho acordada e entrega de relatório.",
      items: [
        "Análise focada e profunda sobre o escopo",
        "Janela de execução dedicada",
        "Relatório técnico com classificação e reprodução",
        "Garantia de retorno: dinheiro de volta ou desconto",
      ],
      cta: "Iniciar com esta modalidade",
    },
    continuo: {
      tag: "Assíncrono",
      title: "Pentest contínuo",
      desc: "Assinatura mensal com execução recorrente de um pentest a cada 30 dias. Feito para produtos que mudam com frequência.",
      items: [
        "Pentest a cada 30 dias",
        "Preço mensal abaixo do equivalente dedicado",
        "Monitoramento recorrente do produto",
        "Contratação prática e recorrente",
      ],
      cta: "Iniciar com esta modalidade",
    },
    featured: "Recomendado",
    note: "Na dúvida: a dedicada é pontual, ideal para uma análise profunda única; a contínua acompanha produtos que mudam todo mês.",
  },
  quemSomos: {
    index: "03",
    eyebrow: "Quem somos",
    titlePre: "Pensamos como um",
    titleHighlight: "atacante real",
    titlePost: "— não como um checklist.",
    subhead:
      "A Vyntra nasce da pesquisa que encontrou falhas e CVEs em grandes empresas de tecnologia. Somos formados por pesquisadores que recusam o pentest mecânico: testamos pensando de forma criativa, como um atacante de verdade.",
    principles: [
      { n: "I", title: "Sem playbook cego", desc: "Vamos além de checklists e scanners automáticos. Cada escopo é analisado no detalhe, manualmente." },
      { n: "II", title: "Mentalidade de atacante", desc: "Pensamos de forma criativa, encadeando falhas como quem de fato tenta invadir o seu produto." },
      { n: "III", title: "Pesquisa aplicada", desc: "Transformamos pesquisa ofensiva real — a mesma que encontrou CVEs — em análise para o seu escopo." },
    ],
    founder: {
      eyebrow: "Pesquisador fundador",
      handle: "@rafabd1",
      desc: "Perfil público no HackerOne, com histórico de relatórios e pesquisas em grandes empresas.",
      cta: "Ver perfil →",
    },
  },
  precificacao: {
    index: "04",
    eyebrow: "Precificação",
    titlePre: "Preço transparente. Você cadastra o escopo e recebe o orçamento",
    titleHighlight: "na hora",
    titlePost: ".",
    subhead:
      "O orçamento sai automaticamente a partir do porte do escopo — pequeno, médio ou grande. Depois nossa equipe confirma as informações e fica disponível ao longo de todo o processo. Prático do orçamento à execução, com previsibilidade e confiabilidade. O pentest contínuo tem valor mensal abaixo do equivalente dedicado.",
    dedicated: {
      tag1: "Síncrono",
      tag2: "Dedicado",
      title: "Pentest dedicado / síncrono",
      desc: "Execução focada sobre um escopo definido, com entrega de relatório. Garantia de retorno: dinheiro de volta ou desconto.",
      price: "Preço por porte do escopo",
      cta: "Cadastrar escopo",
    },
    continuous: {
      tag1: "Assíncrono",
      tag2: "Contínuo",
      title: "Pentest contínuo / assíncrono",
      desc: "Assinatura mensal com um pentest a cada 30 dias. Escolha o plano pelo porte do escopo.",
      label: "Planos",
    },
    plansLabel: "Planos",
    plans: [
      { name: "Lite", for: "Escopo pequeno", desc: "Assets únicos de pequeno porte que precisam de análise recorrente.", points: ["1 asset pequeno", "Pentest a cada 30 dias", "Relatório por ciclo"] },
      { name: "Plus", for: "Escopo médio", desc: "Equilíbrio entre cobertura e custo para produtos em crescimento.", points: ["Até 3 assets pequenos", "ou 1 asset médio", "Pentest a cada 30 dias"] },
      { name: "Harden", for: "Escopo grande", desc: "Cobertura ampliada para produtos com maior superfície de ataque.", points: ["Alvos maiores", "Cobertura ampliada", "Pentest a cada 30 dias"] },
    ],
    popular: "Popular",
    planFooter: "Mensal · contínuo",
    note: "Valor calculado na hora pelos critérios do escopo. Confirmamos as informações e acompanhamos cada etapa com você.",
    noteCta: "Ver meu orçamento →",
  },
  contato: {
    index: "05",
    eyebrow: "Contato",
    titlePre: "Tire dúvidas",
    titleHighlight: "técnicas",
    titlePost: "antes de iniciar.",
    subhead:
      "Fale com a gente para tirar dúvidas técnicas, entender qual modalidade faz sentido e alinhar o escopo antes de começar.",
    channels: {
      email: { label: "E-mail", value: "contact@vyntra.sh" },
      response: { label: "Resposta", value: "Até 1 dia útil" },
      pgp: { label: "PGP", value: "Disponível sob solicitação" },
    },
    disclaimer:
      "Tratamos informações de escopo com sigilo. Dados sensíveis podem ser enviados por canal seguro após o primeiro contato.",
    form: {
      name: "Nome",
      email: "E-mail",
      company: "Empresa / projeto (opcional)",
      message: "Mensagem",
      note: "Resposta em até 1 dia útil",
      submit: "Abrir no email →",
      errName: "Informe seu nome.",
      errEmail: "E-mail inválido.",
      errMessage: "Descreva brevemente o que precisa.",
    },
  },
  ctaFinal: {
    index: "06",
    eyebrow: "Iniciar",
    titlePre: "O resto é",
    titleHighlight: "conosco",
    titlePost: ". Você só cadastra o escopo.",
    text: "O cadastro de escopo e o orçamento automático chegam em breve. Enquanto isso, fale com a gente pelo contato para tirar dúvidas ou antecipar o seu espaço.",
    ctaPrimary: "Iniciar →",
    ctaSecondary: "Falar com a gente",
  },
  footer: {
    desc: "Pentest e pesquisa de segurança.",
    navLabel: "Navegação",
    navModalidades: "Modalidades",
    navQuemSomos: "Quem somos",
    navPrecificacao: "Precificação",
    navContato: "Contato",
    divisionsLabel: "Divisões",
    divisions: [
      { name: "Vyntra Research", desc: "Blog técnico, CVEs e advisories" },
      { name: "Vyntra Pentest", desc: "Pentest dedicado" },
      { name: "Vyntra Continuous", desc: "Pentest contínuo" },
    ],
    copyright: "© 2026 Vyntra Security",
    status: "Operação segura",
    location: "Brasil · Remoto",
  },
  research: {
    eyebrow: "Vyntra Research",
    title: "Pesquisa ofensiva, artigos e writeups.",
    text: "O trabalho de pesquisa por trás da Vyntra — advisories, análise de vulnerabilidades e detalhes técnicos das falhas que encontramos.",
    read: "Ler →",
    readingTime: "min de leitura",
    author: "Autor",
    empty: "Nenhum artigo publicado ainda.",
    hackeroneCta: "perfil no HackerOne →",
    back: "← Research",
    by: "por",
  },
  localeToggle: { switchTo: "EN" },
};

type Dict = typeof pt;

const en: Dict = {
  nav: {
    modalidades: "Engagements",
    quemSomos: "About",
    precificacao: "Pricing",
    contato: "Contact",
    research: "Research",
    iniciar: "Start",
    iniciarSoon: "Start — soon",
  },
  hero: {
    eyebrow1: "Vyntra Security",
    eyebrow2: "Pentest and security research",
    titlePre: "High-level pentest,",
    titleHighlight: "accessible",
    titlePost: "and practical.",
    subhead:
      "The same research that finds CVEs in major companies, applied to your product — with transparent pricing and a practical onboarding.",
    ctaPrimary: "Start →",
    ctaSecondary: "View engagements",
  },
  proof: {
    eyebrow: "Companies where we found vulnerabilities",
    textBefore:
      "Major tech companies where our researchers have already found flaws and reported",
    textAfter:
      "and vulnerabilities. That same research is what we apply to your scope.",
  },
  assets: {
    index: "01",
    eyebrow: "Supported assets",
    title: "Analysis across the asset types that matter to your product.",
    intro:
      "Vyntra works across modern surfaces, from frontend to backend, mobile to the AI layer.",
    items: [
      { n: "01", name: "Web apps", desc: "Web apps, SPAs, dashboards and authenticated flows." },
      { n: "02", name: "APIs", desc: "REST, GraphQL, gRPC and integration contracts." },
      { n: "03", name: "Servers", desc: "Exposed infrastructure, services and network surfaces." },
      { n: "04", name: "Android mobile apps", desc: "APKs, traffic, storage and app flows." },
      { n: "05", name: "Source code", desc: "Code review, audit and guided static analysis." },
      { n: "06", name: "AI / LLMs", desc: "Prompts, agents, integrations and model abuse vectors." },
    ],
  },
  modalidades: {
    index: "02",
    eyebrow: "Engagements",
    title: "Two ways to engage: a dedicated pentest or a recurring subscription.",
    subhead:
      "The practical difference between commissioning a one-off pentest and keeping a subscription with analysis every 30 days.",
    dedicado: {
      tag: "Synchronous",
      title: "Dedicated pentest",
      desc: "Focused execution against a defined scope, with an agreed window and report delivery.",
      items: [
        "Focused, deep analysis of the scope",
        "Dedicated execution window",
        "Technical report with classification and reproduction",
        "Return guarantee: refund or discount",
      ],
      cta: "Start with this engagement",
    },
    continuo: {
      tag: "Asynchronous",
      title: "Continuous pentest",
      desc: "Monthly subscription with a recurring pentest every 30 days. Built for products that change often.",
      items: [
        "Pentest every 30 days",
        "Monthly price below the dedicated equivalent",
        "Recurring monitoring of the product",
        "Practical, recurring onboarding",
      ],
      cta: "Start with this engagement",
    },
    featured: "Recommended",
    note: "Unsure? The dedicated one is a one-off, ideal for a single deep pass; the continuous one keeps up with products that change every month.",
  },
  quemSomos: {
    index: "03",
    eyebrow: "About",
    titlePre: "We think like a",
    titleHighlight: "real attacker",
    titlePost: "— not like a checklist.",
    subhead:
      "Vyntra was born from the research that found flaws and CVEs in major tech companies. We're researchers who reject mechanical pentesting: we test with creative thinking, like a real attacker would.",
    principles: [
      { n: "I", title: "No blind playbook", desc: "We go beyond checklists and automated scanners. Every scope is analyzed in detail, manually." },
      { n: "II", title: "Attacker mindset", desc: "We think creatively, chaining flaws like someone actually trying to break into your product." },
      { n: "III", title: "Applied research", desc: "We turn real offensive research — the same that found CVEs — into analysis for your scope." },
    ],
    founder: {
      eyebrow: "Founding researcher",
      handle: "@rafabd1",
      desc: "Public HackerOne profile, with a track record of reports and research across major companies.",
      cta: "View profile →",
    },
  },
  precificacao: {
    index: "04",
    eyebrow: "Pricing",
    titlePre: "Transparent pricing. Submit your scope and get a quote",
    titleHighlight: "instantly",
    titlePost: ".",
    subhead:
      "The quote is generated automatically from the scope size — small, medium or large. Our team then confirms the details and stays available throughout the engagement. Practical from quote to execution, with predictability and reliability. The continuous pentest has a monthly price below the dedicated equivalent.",
    dedicated: {
      tag1: "Synchronous",
      tag2: "Dedicated",
      title: "Dedicated / synchronous pentest",
      desc: "Focused execution against a defined scope, with a delivered report. Return guarantee: refund or discount.",
      price: "Priced by scope size",
      cta: "Submit scope",
    },
    continuous: {
      tag1: "Asynchronous",
      tag2: "Continuous",
      title: "Continuous / asynchronous pentest",
      desc: "Monthly subscription with a pentest every 30 days. Pick the plan by scope size.",
      label: "Plans",
    },
    plansLabel: "Plans",
    plans: [
      { name: "Lite", for: "Small scope", desc: "Single small assets that need recurring analysis.", points: ["1 small asset", "Pentest every 30 days", "Per-cycle report"] },
      { name: "Plus", for: "Medium scope", desc: "Balance between coverage and cost for growing products.", points: ["Up to 3 small assets", "or 1 medium asset", "Pentest every 30 days"] },
      { name: "Harden", for: "Large scope", desc: "Expanded coverage for products with a larger attack surface.", points: ["Larger targets", "Expanded coverage", "Pentest every 30 days"] },
    ],
    popular: "Popular",
    planFooter: "Monthly · continuous",
    note: "Price calculated instantly from your scope's criteria. We confirm the details and walk every step with you.",
    noteCta: "See my quote →",
  },
  contato: {
    index: "05",
    eyebrow: "Contact",
    titlePre: "Ask your",
    titleHighlight: "technical",
    titlePost: "questions before starting.",
    subhead:
      "Reach out to ask technical questions, figure out which engagement makes sense, and align the scope before we start.",
    channels: {
      email: { label: "Email", value: "contact@vyntra.sh" },
      response: { label: "Response", value: "Within 1 business day" },
      pgp: { label: "PGP", value: "Available on request" },
    },
    disclaimer:
      "We treat scope information as confidential. Sensitive data can be sent over a secure channel after first contact.",
    form: {
      name: "Name",
      email: "Email",
      company: "Company / project (optional)",
      message: "Message",
      note: "Reply within 1 business day",
      submit: "Open in email →",
      errName: "Please enter your name.",
      errEmail: "Invalid email.",
      errMessage: "Briefly describe what you need.",
    },
  },
  ctaFinal: {
    index: "06",
    eyebrow: "Start",
    titlePre: "The rest is",
    titleHighlight: "on us",
    titlePost: ". You just submit the scope.",
    text: "Scope submission and the automatic quote are coming soon. In the meantime, reach out via contact to ask questions or reserve your slot.",
    ctaPrimary: "Start →",
    ctaSecondary: "Talk to us",
  },
  footer: {
    desc: "Pentest and security research.",
    navLabel: "Navigation",
    navModalidades: "Engagements",
    navQuemSomos: "About",
    navPrecificacao: "Pricing",
    navContato: "Contact",
    divisionsLabel: "Divisions",
    divisions: [
      { name: "Vyntra Research", desc: "Technical blog, CVEs and advisories" },
      { name: "Vyntra Pentest", desc: "Dedicated pentest" },
      { name: "Vyntra Continuous", desc: "Continuous pentest" },
    ],
    copyright: "© 2026 Vyntra Security",
    status: "Secure ops",
    location: "Brazil · Remote",
  },
  research: {
    eyebrow: "Vyntra Research",
    title: "Offensive research, articles and writeups.",
    text: "The research work behind Vyntra — advisories, vulnerability analysis and the technical details of the flaws we find.",
    read: "Read →",
    readingTime: "min read",
    author: "Author",
    empty: "No articles published yet.",
    hackeroneCta: "HackerOne profile →",
    back: "← Research",
    by: "by",
  },
  localeToggle: { switchTo: "PT" },
};

export const dictionaries: Record<Locale, Dict> = { pt, en };
export type Dictionary = Dict;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
