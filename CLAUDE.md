# catalogo-trocas

Catálogo pesquisável de trocas de um jogo, montado a partir de screenshots do menu de trocas. Idioma: pt-BR.

## Estrutura

- `Imagens\<NPC>\*.png` — screenshots do menu de trocas. **Convenção**: o nome da pasta é o NPC/comerciante (ex.: `Barmen`); o nome do arquivo é livre (o usuário solta capturas com nome automático — o item é lido de dentro da imagem).
- `dados.js` — base de dados (`const CATALOGO = [...]`), uma entrada por troca com `item`, `npc`, `lugar` (cidade/região onde o NPC fica — perguntar ao usuário para NPCs novos; conhecidos: Barmen → Rostok, Sakharov → Yantar, Fox/Wolf/Sidorovich → Cordon, Petrenko → Bazar), `materiais` (`{nome, qtd}`), `imagem` (caminho relativo com `/`). É JS e não JSON porque `index.html` também é aberto via `file://` e `fetch` de JSON local falha.
- `index.html` — página única (abrir direto no navegador ou via GitHub Pages): busca por item final ou material (ignora acentos/caixa), selects de NPC e de Lugar, cards com thumbnail.

## Publicação

O site é servido pelo GitHub Pages a partir da branch `main` (raiz): https://romulo-mendes.github.io/catalogo-trocas/. Todo `git push` na `main` republica em ~1 minuto — após atualizar o catálogo, commitar e dar push. O servidor é Linux: os caminhos `imagem` em `dados.js` precisam bater com os arquivos em maiúsculas/minúsculas exatas.

## Fluxo de atualização (quando chegarem novos prints)

1. O usuário solta os novos screenshots em `Imagens\<NPC>\` e pede para atualizar o catálogo.
2. Listar as imagens no disco e comparar com os caminhos `imagem` já registrados em `dados.js` — ler **apenas** as imagens novas.
3. Ler cada imagem nova com a tool Read (visualmente): extrair o item final (título central), os materiais e quantidades da seção "Requisitos" (tiles vermelhos, "xN" em verde). Para rótulos pequenos/ambíguos, recortar e ampliar a faixa de requisitos com ffmpeg (`crop=iw:200:0:ih-210,scale=iw*3:-1:flags=lanczos`) e ler o recorte.
4. Adicionar as entradas em `dados.js`; se o NPC for novo, perguntar ao usuário em que lugar ele fica. Nada a mudar em `index.html` (selects e busca são derivados dos dados). Ao final, commitar e dar `git push` para publicar no site.

## Armadilhas

- **Nomes cortados na interface do jogo**: tiles com texto truncado (ex.: "…ntado de Açúcar Que…") recebem `incerto: true` no material — a página mostra um "?" para o usuário confirmar. Ao confirmar, corrigir o `nome` e remover o `incerto`. Se a reconstrução for óbvia e inequívoca (ex.: "…ermômetro Analógico" → "Termômetro Analógico"), não marcar.
- O mesmo item final pode aparecer em mais de uma troca (ex.: duas variantes de "Traje Sunrise" com requisitos diferentes) — manter uma entrada por troca, não deduplicar por nome.
- **Tile de requisito vazio** (bug da interface: só o "xN", sem ícone nem nome — visível mesmo no recorte ampliado): registrar como `{ nome: "Material desconhecido", qtd: N, incerto: true }` para o usuário confirmar no jogo depois.
- **Print duplicado da mesma troca** (mesmo item e mesmos requisitos em dois arquivos): registrar só uma entrada e deixar um comentário em `dados.js` apontando o arquivo duplicado, para ele não parecer "novo" nas próximas rodadas (ex.: `Sidorovich/Screenshot_6.png` = duplicata da `Captura ...231257.png`).
- Não renomear as pastas de `Imagens\` sem atualizar os caminhos `imagem` correspondentes em `dados.js`.
- Em `index.html`, o regex de remoção de acentos usa a forma escapada `\u0300-\u036f` de propósito — não substituir pelos caracteres combinantes literais.
