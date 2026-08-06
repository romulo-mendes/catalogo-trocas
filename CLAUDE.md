# catalogo-trocas

Catálogo pesquisável de um jogo, montado a partir de screenshots. Idioma: pt-BR. São **dois sistemas independentes**, cada um com sua página e sua base:

| Sistema | Imagens | Base | Página |
|---|---|---|---|
| Trocas com NPCs | `Imagens\Trocas\<NPC>\` | `dados.js` (`CATALOGO`) | `index.html` |
| Bancada de craft | `Imagens\Craft\<Lugar>\` | `craft.js` (`MATERIAIS_CRAFT` + `CRAFT`) | `craft.html` |

As duas páginas se linkam por um `<nav>` no header. Categorias e estilo são compartilhados (copiados, não importados — cada página é autocontida).

## Estrutura

- `Imagens\Trocas\<NPC>\*.png` — screenshots do menu de trocas. **Convenção**: o nome da pasta é o NPC/comerciante (ex.: `Barmen`); o nome do arquivo é livre (o usuário solta capturas com nome automático — o item é lido de dentro da imagem).
- `Imagens\Craft\<Lugar>\*.png` — screenshots da bancada de craft, agrupados por **lugar** (a bancada não tem NPC). `Imagens\Craft\_icones\m*.png` são recortes dos ícones de ingrediente, gerados a partir dos próprios screenshots (ver "Bancada de craft").
- `dados.js` — base de dados (`const CATALOGO = [...]`), uma entrada por troca com `item`, `npc`, `lugar` (cidade/região onde o NPC fica — perguntar ao usuário para NPCs novos; conhecidos: Barmen → Rostok, Sakharov → Yantar, Fox/Wolf/Sidorovich → Cordon, Petrenko → Bazar, Coruja → Yanov, Barbudo → Skadovsk (Zaton)), `categoria` (ver abaixo), `materiais` (`{nome, qtd}`), `imagem` (caminho relativo com `/`). É JS e não JSON porque `index.html` também é aberto via `file://` e `fetch` de JSON local falha.
- `index.html` — página única (abrir direto no navegador ou via GitHub Pages): busca por item final ou material (ignora acentos/caixa), selects de NPC, Lugar e Categoria, cards com thumbnail.

## Categorias

Valores permitidos de `categoria` (a ordem do select vive em `ORDEM_CATEGORIAS`, em `index.html` — categoria nova que não esteja lá aparece no fim da lista):

- **Armas** — armas de fogo e corpo a corpo (facas entram aqui).
- **Roupas** — trajes e coletes.
- **Proteção / Máscaras** — máscaras de gás e capacetes (separados de Roupas por decisão do usuário).
- **Acessórios** — acessórios de arma e equipamento: miras, supressores, NVG, kits de conversão.
- **Detectores e Dispositivos** — detectores de artefato, dosímetros e eletrônicos em geral.
- **Outros** — o que não se encaixar (ex.: granadas).

## Bancada de craft

A tela da bancada é **muito mais pobre que a de trocas**: mostra só o modelo 3D do resultado, os ícones dos ingredientes e a quantidade `possuído/necessário` (`0/2` em vermelho, verde quando satisfeito). **Não há texto algum** — nem nome do resultado, nem nome dos ingredientes. Portanto:

- O que dá para extrair da imagem com confiança: **quantos** ingredientes, a **quantidade** de cada e a **identidade visual** (o ícone).
- O que **não** dá: qualquer nome. Esses ficam `null` e a página mostra a `dica` (descrição visual) com um "?" em itálico.

Por isso `craft.js` usa um **dicionário de ingredientes por ícone** (`MATERIAIS_CRAFT`, ids `m01`…), e as receitas referenciam por id. Nomear um ingrediente ali, uma vez, preenche todas as receitas que o usam — inclusive as futuras. Não repetir o nome dentro de cada receita.

Ao processar prints novos da bancada:

1. Ampliar a faixa de ingredientes para ler as quantidades: `crop=iw*0.60:ih*0.16:iw*0.20:ih*0.755,scale=iw*3:-1:flags=lanczos`.
2. Para cada ícone, verificar se já existe em `MATERIAIS_CRAFT` (comparar visualmente com `Imagens\Craft\_icones\`). Se existir, reusar o id — **não** criar id novo para o mesmo ícone.
3. Ícone realmente novo: recortar com `crop=iw*0.0805:ih*0.115:iw*(0.2187+<indice>*0.084):ih*0.760,scale=120:120` (índice do tile a partir de 0), salvar como `m<NN>.png` e criar a entrada com `nome: null` + `dica`.
4. Vale tentar casar o ícone com um material já nomeado nas **trocas** — foi assim que `Peças metálicas` e `Peças de armas` foram identificados. Os prints de troca mostram ícone **com** nome, então servem de gabarito.

## Publicação

O site é servido pelo GitHub Pages a partir da branch `main` (raiz): https://romulo-mendes.github.io/catalogo-trocas/. Todo `git push` na `main` republica em ~1 minuto — após atualizar o catálogo, commitar e dar push. O servidor é Linux: os caminhos `imagem` em `dados.js` precisam bater com os arquivos em maiúsculas/minúsculas exatas.

O GitHub Pages serve os `.js` com `Cache-Control: max-age=600`, então o navegador continua usando a cópia antiga por até 10 min depois do push (sintoma: o site novo carrega mas sem as trocas novas). Por isso as páginas carregam `dados.js?v=<data>` / `craft.js?v=<data>` — **bumpar essa data toda vez que o `.js` correspondente mudar**, no mesmo commit.

## Fluxo de atualização (quando chegarem novos prints de troca)

1. O usuário solta os novos screenshots em `Imagens\Trocas\<NPC>\` e pede para atualizar o catálogo.
2. Listar as imagens no disco e comparar com os caminhos `imagem` já registrados em `dados.js` — ler **apenas** as imagens novas.
3. Ler cada imagem nova com a tool Read (visualmente): extrair o item final (título central), os materiais e quantidades da seção "Requisitos" (tiles vermelhos, "xN" em verde). Para rótulos pequenos/ambíguos, recortar e ampliar a faixa de requisitos com ffmpeg (`crop=iw:200:0:ih-210,scale=iw*3:-1:flags=lanczos`) e ler o recorte.
4. Adicionar as entradas em `dados.js` com a `categoria` de cada item; se o NPC for novo, perguntar ao usuário em que lugar ele fica. Nada a mudar em `index.html` (selects e busca são derivados dos dados). Ao final, commitar e dar `git push` para publicar no site.

## Armadilhas

- **Nomes cortados na interface do jogo**: tiles com texto truncado (ex.: "…ntado de Açúcar Que…") recebem `incerto: true` no material — a página mostra um "?" para o usuário confirmar. Ao confirmar, corrigir o `nome` e remover o `incerto`. Se a reconstrução for óbvia e inequívoca (ex.: "…ermômetro Analógico" → "Termômetro Analógico"), não marcar.
- O mesmo item final pode aparecer em mais de uma troca (ex.: duas variantes de "Traje Sunrise" com requisitos diferentes) — manter uma entrada por troca, não deduplicar por nome.
- **Tile de requisito vazio** (bug da interface: só o "xN", sem ícone nem nome — visível mesmo no recorte ampliado): registrar como `{ nome: "Material desconhecido", qtd: N, incerto: true }` para o usuário confirmar no jogo depois.
- **Print duplicado da mesma troca** (mesmo item e mesmos requisitos em dois arquivos): registrar só uma entrada e deixar um comentário em `dados.js` apontando o arquivo duplicado, para ele não parecer "novo" nas próximas rodadas (ex.: `Sidorovich/Screenshot_6.png` = duplicata da `Captura ...231257.png`).
- Não renomear as pastas de `Imagens\` sem atualizar os caminhos `imagem` correspondentes em `dados.js` / `craft.js`.
- O usuário às vezes solta a pasta inteira em vez do conteúdo (já aconteceu de virar `Imagens\Imagens\`) — conferir onde os arquivos caíram antes de processar, e comparar o conteúdo com `cmp` quando os nomes colidirem com prints já existentes (o Windows nomeia `Screenshot_N.png` repetido entre pastas).
- Em `index.html`, o regex de remoção de acentos usa a forma escapada `\u0300-\u036f` de propósito — não substituir pelos caracteres combinantes literais.
