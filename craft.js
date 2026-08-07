// Base de dados da bancada de craft.
//
// A tela da bancada NÃO mostra nome nenhum — só o modelo 3D do resultado, os ícones
// dos ingredientes e a quantidade ("0/2" = possuído/necessário). Por isso o modelo aqui
// é diferente do `dados.js` das trocas:
//
//   MATERIAIS_CRAFT — dicionário de ingrediente por ícone. `nome: null` = ainda não sabemos
//     o nome no jogo; a página mostra o ícone e um "?" no lugar do nome. Nomear AQUI, uma
//     única vez, preenche todas as receitas que usam aquele ícone (agora e no futuro).
//   CRAFT — uma entrada por receita, referenciando os ingredientes por id.
//
// Os ícones em `Imagens/Craft/_icones/` foram recortados dos próprios screenshots.
// `incerto: true` = nome que ainda não foi possível confirmar (a página mostra um "?").
const MATERIAIS_CRAFT = {
  m01: { nome: "Kit médico militar", icone: "Imagens/Craft/_icones/m01.png" },
  // Confirmados por comparação de ícone com uma troca já catalogada:
  m02: { nome: "Cartela de Remédios Preservada", icone: "Imagens/Craft/_icones/m02.png" }, // = Taurus Raging Bull (Barmen)
  m06: { nome: "Projeto", icone: "Imagens/Craft/_icones/m06.png" },                       // = Supressor GemTech Tundra (Barmen)
  m07: { nome: "Peças de reposição SE", icone: "Imagens/Craft/_icones/m07.png" },         // = Máscara XM-40 (Barmen)
  m08: { nome: "SK 59/66", icone: "Imagens/Craft/_icones/m08.png" },                      // = Fuzil SKS Tático (Barbudo)
  m09: { nome: "Fuzil SKS Tático", icone: "Imagens/Craft/_icones/m09.png" },              // = item final de uma troca do Barbudo
  m12: { nome: "Peças metálicas", icone: "Imagens/Craft/_icones/m12.png" },               // = VSK-94 (Coruja)
  m13: { nome: "Peças de armas", icone: "Imagens/Craft/_icones/m13.png" },                // = Viper-5 (Wolf)

  m03: { nome: "Placa de Kevlar", icone: "Imagens/Craft/_icones/m03.png" },
  m11: { nome: "AK", incerto: true, dica: "AK com coronha de madeira — modelo exato não identificado", icone: "Imagens/Craft/_icones/m11.png" },

  // Nomes propostos que NÃO bateram na comparação de ícone — reconferir no jogo:
  // o "Pedaço de acrílico" das trocas é um quadrado marrom texturizado, este é branco liso.
  m04: { nome: "Pedaço de acrílico", incerto: true, dica: "quadrado branco liso", icone: "Imagens/Craft/_icones/m04.png" },
  // o "Controlador de motor" da SPAS-12 é uma placa plana enferrujada, este é um painel
  // metálico com faixas vermelhas e botões, visto em perspectiva.
  m10: { nome: "Controlador de motor", incerto: true, dica: "painel metálico com faixas vermelhas", icone: "Imagens/Craft/_icones/m10.png" },

  m05: { nome: null, dica: "retângulo dourado/mostarda (algum tecido?)", icone: "Imagens/Craft/_icones/m05.png" },
};

// `item: null` = a bancada não mostra o nome do resultado, só o modelo 3D (ver `imagem`).
const CRAFT = [
  {
    item: null,
    dica: "kit médico azul «АПТЕЧКА ИНДИВИДУАЛЬНАЯ»",
    lugar: "Yanov",
    categoria: "Outros",
    ingredientes: [
      { id: "m01", qtd: 2 },
      { id: "m02", qtd: 1 },
    ],
    imagem: "Imagens/Craft/Yanov/Screenshot_2.png",
  },
  {
    item: null,
    dica: "colete tático com placas (marrom)",
    lugar: "Yanov",
    categoria: "Roupas",
    ingredientes: [
      { id: "m03", qtd: 2 },
      { id: "m04", qtd: 1 },
      { id: "m12", qtd: 1 },
      { id: "m05", qtd: 1 },
      { id: "m06", qtd: 1 },
    ],
    imagem: "Imagens/Craft/Yanov/Screenshot_3.png",
  },
  {
    item: null,
    dica: "colete preto pesado",
    lugar: "Yanov",
    categoria: "Roupas",
    ingredientes: [
      { id: "m03", qtd: 2 },
      { id: "m04", qtd: 2 },
      { id: "m12", qtd: 2 },
      { id: "m05", qtd: 1 },
      { id: "m06", qtd: 1 },
    ],
    imagem: "Imagens/Craft/Yanov/Screenshot_4.png",
  },
  {
    item: null,
    dica: "colete verde oliva",
    lugar: "Yanov",
    categoria: "Roupas",
    ingredientes: [
      { id: "m07", qtd: 4 },
      { id: "m03", qtd: 2 },
      { id: "m04", qtd: 1 },
      { id: "m05", qtd: 1 },
      { id: "m06", qtd: 1 },
    ],
    imagem: "Imagens/Craft/Yanov/Screenshot_5.png",
  },
  {
    item: null,
    dica: "colete porta-carregadores preto (chest rig)",
    lugar: "Yanov",
    categoria: "Roupas",
    ingredientes: [
      { id: "m07", qtd: 4 },
      { id: "m03", qtd: 1 },
      { id: "m05", qtd: 1 },
      { id: "m06", qtd: 1 },
    ],
    imagem: "Imagens/Craft/Yanov/Screenshot_6.png",
  },
  {
    item: null,
    dica: "fuzil de precisão preto (VSS/VSK?)",
    lugar: "Yanov",
    categoria: "Armas",
    ingredientes: [
      { id: "m08", qtd: 1 },
      { id: "m09", qtd: 1 },
      { id: "m13", qtd: 5 },
      { id: "m12", qtd: 3 },
      { id: "m10", qtd: 1 },
    ],
    imagem: "Imagens/Craft/Yanov/Screenshot_7.png",
  },
  {
    item: null,
    dica: "AK com cano enrolado em couro",
    lugar: "Yanov",
    categoria: "Armas",
    ingredientes: [
      { id: "m11", qtd: 1 },
      { id: "m13", qtd: 3 },
      { id: "m12", qtd: 2 },
    ],
    imagem: "Imagens/Craft/Yanov/Screenshot_8.png",
  },
  {
    item: null,
    dica: "AK camuflado claro",
    lugar: "Yanov",
    categoria: "Armas",
    ingredientes: [
      { id: "m11", qtd: 1 },
      { id: "m13", qtd: 3 },
      { id: "m12", qtd: 2 },
    ],
    imagem: "Imagens/Craft/Yanov/Screenshot_9.png",
  },
  {
    item: null,
    dica: "AK com fita no cano",
    lugar: "Yanov",
    categoria: "Armas",
    ingredientes: [
      { id: "m11", qtd: 1 },
      { id: "m13", qtd: 4 },
      { id: "m12", qtd: 2 },
    ],
    imagem: "Imagens/Craft/Yanov/Screenshot_10.png",
  },
  {
    item: null,
    dica: "casaco com capuz (verde/preto)",
    lugar: "Yanov",
    categoria: "Roupas",
    ingredientes: [
      { id: "m03", qtd: 2 },
      { id: "m05", qtd: 2 },
      { id: "m12", qtd: 1 },
    ],
    imagem: "Imagens/Craft/Yanov/Screenshot_11.png",
  },
];
