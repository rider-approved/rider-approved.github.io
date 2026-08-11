# RiderApproved

Site de acessórios de moto **avaliados por quem realmente usou** — com quilometragem real, dicas de instalação e links de onde comprar.

É um site estático (Astro), sem login, sem carrinho e sem banco de dados. Todo o conteúdo mora em arquivos dentro do repositório: para publicar uma análise nova você cria um arquivo Markdown e faz commit. A monetização é por links de afiliado e conteúdo patrocinado, sempre declarados na página `/transparency`.

- **Idioma:** português do Brasil apenas.
- **Publicação:** GitHub Pages, automático a cada push na branch `main` (`.github/workflows/deploy.yml`).

---

## Índice

1. [Rodando o site na sua máquina](#rodando-o-site-na-sua-máquina)
2. [Onde fica cada coisa](#onde-fica-cada-coisa)
3. [Produtos: adicionar, editar e remover](#produtos-adicionar-editar-e-remover)
4. [Todos os campos de um produto](#todos-os-campos-de-um-produto)
5. [Fotos](#fotos)
6. [Links de compra](#links-de-compra)
7. [Vídeo do YouTube](#vídeo-do-youtube)
8. [Seções e categorias](#seções-e-categorias)
9. [Parceiros](#parceiros)
10. [Textos do site](#textos-do-site)
11. [O que é calculado sozinho](#o-que-é-calculado-sozinho)
12. [Cores e tema](#cores-e-tema)
13. [Antes de publicar](#antes-de-publicar)
14. [Regras que não podem ser quebradas](#regras-que-não-podem-ser-quebradas)

---

## Rodando o site na sua máquina

```bash
npm install           # só na primeira vez
npm run dev           # abre em http://localhost:4321/
```

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Sobe o site local com recarga automática |
| `npm run build` | Gera o site final na pasta `dist/` |
| `npm run preview` | Mostra o resultado do `build` como ficará no ar |
| `npm run check:contrast` | Confere se todas as cores têm contraste legível |
| `npx playwright test` | Roda os testes automatizados |

> O site é servido na raiz (`/`), tanto local quanto publicado. Isso só funciona porque o repositório se chama **`rider-approved.github.io`** — o GitHub Pages só serve na raiz quando o nome do repositório é exatamente `<dono>.github.io`. Se o repositório for renomeado para qualquer outra coisa, é obrigatório mudar `base` para `'/nome-do-repositorio'` em `astro.config.mjs`; senão o site publicado carrega sem CSS nem imagens.

---

## Onde fica cada coisa

```
src/
├── content/products/       ← AS ANÁLISES (é aqui que você mais mexe)
│   └── <seção>/<categoria>/<produto>/
│       ├── index.md        ← o texto e os dados da análise
│       └── foto.jpg        ← as fotos ficam na mesma pasta
├── config/
│   ├── catalog.ts          ← lista de seções e categorias
│   ├── partners.ts         ← canais parceiros
│   └── images.ts           ← tamanhos padrão de imagem
├── i18n/pt.json            ← todos os textos fixos do site
├── styles/tokens.css       ← todas as cores
├── components/             ← peças visuais reaproveitadas
└── pages/                  ← as páginas e rotas
```

---

## Produtos: adicionar, editar e remover

### Adicionar um produto

O endereço da página **é o caminho da pasta**. Esta estrutura:

```
src/content/products/kawasaki-eliminator-500/tires/michelin-road-6/index.md
```

vira esta URL:

```
/kawasaki-eliminator-500/tires/michelin-road-6/
```

Então, para criar uma análise nova:

1. **Crie a pasta** dentro da seção e categoria certas. A categoria precisa existir em `src/config/catalog.ts` (veja [Seções e categorias](#seções-e-categorias)).
2. **Crie o `index.md`** dentro dela. O arquivo tem que se chamar exatamente `index.md`.
3. **Preencha o cabeçalho** (a parte entre `---`) e escreva o texto abaixo dele.

Exemplo mínimo que já funciona:

```markdown
---
title: "Pirelli Angel GT II"
brand: "Pirelli"
verdict:
  text: "Ótimo pneu para uso diário. Excelente agarre no molhado."
  by: "Fernando"
date: "2025-04-20"
---

Aqui vai o texto completo da análise, em Markdown.

**Pontos positivos:**

- Excelente comportamento na chuva

**Pontos negativos:**

- Preço acima da média
```

Só `title`, `verdict` e `date` são obrigatórios. Todo o resto é opcional e, quando você não preenche, **a seção simplesmente não aparece na página** — nada fica com título vazio ou "em breve".

### Editar um produto

Abra o `index.md` e altere o que precisar. Com `npm run dev` rodando, a página recarrega sozinha.

Duas coisas para lembrar ao editar:

- **Mudar o nome da pasta muda a URL.** Se a página já foi divulgada, quem tiver o link antigo vai cair num 404.
- **O campo `date` controla a ordem.** Ele define a posição em "Adicionados recentemente" na home e a ordem dentro da categoria (mais novo primeiro). Se você só corrigiu um erro de digitação, **não mexa na data** — senão o produto pula para o topo como se fosse novidade.

### Remover um produto

Apague a pasta inteira do produto:

```bash
rm -rf src/content/products/kawasaki-eliminator-500/tires/michelin-road-6/
```

Não precisa mexer em mais nada. Os contadores, as estatísticas e a listagem da categoria se ajustam sozinhos. Se a categoria ficar sem nenhum produto, ela volta a mostrar o aviso "Ainda não testamos ..." automaticamente.

---

## Todos os campos de um produto

### Obrigatórios

| Campo | Tipo | Observação |
| --- | --- | --- |
| `title` | texto | Nome do produto como aparece no site |
| `verdict.text` | texto | O veredito curto, destacado no topo da página |
| `verdict.by` | texto | Quem testou |
| `date` | data `AAAA-MM-DD` | Controla a ordenação em todo o site |

### Opcionais

| Campo | Tipo | O que faz |
| --- | --- | --- |
| `brand` | texto | Marca, exibida junto ao título |
| `verdict.bike` | texto | Em qual moto foi testado |
| `verdict.km` | número | Quilometragem rodada com o produto |
| `images` | lista | Fotos — veja [Fotos](#fotos) |
| `buyLinks` | lista | Onde comprar — veja [Links de compra](#links-de-compra) |
| `specs` | lista de `label`/`value` | Tabela curta de especificações |
| `adaptation` | lista de textos | Dicas de instalação/adaptação, uma por item |
| `testimonials` | lista | Depoimentos de outros pilotos (`text`, `by`, `bike`, `km`) |
| `video` | objeto | Vídeo do YouTube — veja [Vídeo](#vídeo-do-youtube) |
| `moreInfo` | objeto | Conteúdo do acordeão "Mais informações" |

Exemplo com tudo preenchido:

```yaml
---
title: "Akrapovic Slip-On Line (Titanium)"
brand: "Akrapovic"
images:
  - src: "./escape-lateral.jpg"
    alt: "Escape Akrapovic instalado na lateral direita da moto"
    kind: product
verdict:
  text: "Som incrível e 2,3 kg a menos. Instalação de uns 45 minutos."
  by: "Fernando"
  bike: "Kawasaki Eliminator 500"
  km: 8000
buyLinks:
  - label: "Mercado Livre"
    url: "https://www.mercadolivre.com.br/p/MLLINK"
    price: 4890.00
    checkedAt: "2025-05-10"
    featured: true
specs:
  - label: "Material"
    value: "Titânio"
  - label: "Peso"
    value: "2,1 kg"
adaptation:
  - "Não exige remapeamento da injeção."
  - "O suporte original é reaproveitado — guarde os parafusos."
testimonials:
  - text: "Comprei depois de ver aqui. Som ficou perfeito."
    by: "Marcos"
    bike: "Eliminator 500"
    km: 3000
video:
  url: "https://www.youtube.com/watch?v=XXXXXXXXXXX"
  creditPartner: "coffee-ride"
moreInfo:
  compatibility: "Serve apenas nos modelos 2023 em diante."
  warranty: "2 anos direto com o fabricante."
  manual:
    - label: "Manual de instalação (PDF)"
      url: "https://exemplo.com/manual.pdf"
date: "2025-06-01"
---
```

---

## Fotos

As fotos ficam **na mesma pasta do `index.md`** e são referenciadas com caminho relativo (`./nome.jpg`). Não use links de imagens hospedadas em outros sites: elas sabem sumir e deixam a página quebrada.

```yaml
images:
  - src: "./frente.jpg"
    alt: "Pneu Michelin Road 6 montado na roda dianteira"
    kind: product
  - src: "./na-estrada.jpg"
    alt: "Moto em curva na serra com o pneu instalado"
    kind: lifestyle
    position: "center 30%"
```

| Campo | Para que serve |
| --- | --- |
| `src` | Caminho relativo do arquivo, começando com `./` |
| `alt` | **Obrigatório.** Descrição da foto para quem usa leitor de tela |
| `kind` | `product` (padrão) mostra a peça inteira com folga; `lifestyle` preenche todo o quadro |
| `position` | Ajusta o recorte quando o assunto não está no centro (ex.: `"center 30%"`) |

A primeira foto da lista é a principal — aparece na listagem e no topo da página. As demais viram miniaturas (até 5).

**Sem foto o site não quebra:** aparece um espaço com o ícone da categoria e o aviso "Sem foto ainda". Pode publicar a análise agora e adicionar as fotos depois.

O Astro cuida sozinho de redimensionar, gerar AVIF/WebP e ajustar para telas de alta densidade. Envie a imagem no tamanho original.

---

## Links de compra

```yaml
buyLinks:
  - label: "Mercado Livre"
    url: "https://www.mercadolivre.com.br/p/MLB123456789"
    price: 4890.00
    checkedAt: "2025-05-10"
    featured: true
```

| Campo | Observação |
| --- | --- |
| `label` | Nome da loja, como aparece no botão |
| `url` | **Obrigatório e precisa ser uma URL válida** — o build falha se não for |
| `price` | Número puro, sem `R$` e sem separador de milhar. `4890.00`, não `"R$ 4.890,00"` |
| `checkedAt` | Data em que você conferiu o preço |
| `featured` | `true` destaca este link como o principal |

Sobre o preço, duas coisas acontecem sozinhas:

- Ele é formatado em reais (`R$ 4.890,00`) automaticamente.
- **Depois de 30 dias**, o site para de afirmar o valor e passa a mostrar "Verificado em ... — pode ter mudado". Você não precisa fazer nada; é só atualizar o `checkedAt` quando reconferir.

Se um produto não tem nenhum link, a seção "Onde comprar" e a barra fixa de compra simplesmente não aparecem.

---

## Vídeo do YouTube

```yaml
video:
  url: "https://www.youtube.com/watch?v=XXXXXXXXXXX"
  creditPartner: "coffee-ride"
```

Funcionam tanto `youtube.com/watch?v=...` quanto `youtu.be/...`.

O vídeo **não carrega sozinho**: aparece a miniatura e o player do YouTube só é inserido quando o visitante clica. Isso deixa a página rápida e evita que o YouTube rastreie quem nem assistiu.

`creditPartner` é opcional e recebe a `key` de um parceiro cadastrado. Com ela, aparece "Vídeo por **Nome do Canal**" logo abaixo do vídeo, com link para o canal.

---

## Seções e categorias

Tudo isso vive em **`src/config/catalog.ts`**. Hoje existem duas seções: a moto (`kawasaki-eliminator-500`) e os equipamentos de piloto (`rider`).

### Adicionar uma categoria

São **dois** arquivos, sempre:

**1.** Em `src/config/catalog.ts`, dentro da seção desejada:

```ts
{ slug: 'baus', labelKey: 'category.baus', icon: ICONS.box },
```

**2.** Em `src/i18n/pt.json`, o nome que vai aparecer na tela:

```json
"category.baus": "Baús"
```

Se você esquecer o passo 2, o site mostra literalmente `category.baus` no lugar do nome — é assim que o erro aparece.

Os ícones disponíveis estão no topo do `catalog.ts` (`ICONS`): `wheel`, `helmet`, `exhaust`, `seat`, `chain`, `mirror`, `spray`, `paint`, `bulb`, `box`, `glove`, `jacket`.

### Adicionar uma seção (outra moto)

Mesma ideia, no nível de cima:

```ts
{
  slug: 'honda-cb-500',
  labelKey: 'section.cb500',
  categories: [
    { slug: 'tires', labelKey: 'category.tires', icon: ICONS.wheel },
  ],
},
```

E o texto correspondente em `pt.json`: `"section.cb500": "Honda CB 500"`.

> **Slugs reservados:** `styleguide`, `transparency` e `community` já são páginas do site. Se você usar um deles como slug de seção, o build para com uma mensagem explicando — de propósito, para não criar uma rota que nunca abriria.

### Remover uma categoria

Antes de tirar a categoria do `catalog.ts`, **apague ou mova os produtos que estão nela**. Um produto numa categoria que não existe mais fica sem página acessível.

### Categorias vazias são normais

Pode cadastrar a categoria antes de ter produto. Ela aparece com contador `0`, e a página dela mostra "Ainda não testamos ..." com um convite para o visitante indicar um produto.

A barra de categorias se organiza sozinha: **as que têm produto vêm primeiro**, as vazias depois. Ela só passa a esconder itens atrás de um "+ N categorias" quando houver **12 ou mais** — mostra 9 e nunca esconde menos de 3, porque um botão que esconde uma ou duas coisas atrapalha mais do que ajuda.

---

## Parceiros

Em **`src/config/partners.ts`**. Um parceiro cadastrado aparece em três lugares:

1. No rodapé de todas as páginas ("Em parceria com").
2. Na página `/community`, com um card completo.
3. Abaixo de qualquer vídeo que tenha `creditPartner` com a `key` dele.

Para adicionar:

1. **Baixe o avatar** e salve em `src/assets/partners/<key>.jpg`. Não use o link direto da plataforma — esses endereços mudam e somem sem aviso. Mantenha a extensão correta: o YouTube entrega JPEG mesmo quando o link parece `.png`.
2. Importe e adicione a entrada:

```ts
import coffeeRide from '../assets/partners/coffee-ride.jpg';

export const partners: Partner[] = [
  {
    key: 'coffee-ride',
    name: 'Coffee Ride Motorcycle',
    handle: '@CoffeeRideMotorcycle',
    platform: 'youtube',
    url: 'https://www.youtube.com/@CoffeeRideMotorcycle',
    logo: coffeeRide,
    blurb: 'Canal parceiro no YouTube.',
  },
];
```

**Só cadastre depois que o parceiro concordar.** Publicar nome e logo antes disso mostra um apoio que não existe, usando a marca de outra pessoa. Para desfazer, basta remover a entrada da lista — some de todos os lugares de uma vez.

---

## Textos do site

Todo texto fixo (botões, títulos de seção, avisos) está em **`src/i18n/pt.json`**. Para mudar qualquer palavra da interface, edite ali — não procure dentro dos componentes.

Chaves com `{n}` ou `{date}` recebem valores calculados. E onde existem duas versões (`nav.showAll.one` e `nav.showAll.other`), o site escolhe singular ou plural conforme o número — mantenha as duas coerentes.

---

## O que é calculado sozinho

Não edite estes valores à mão; eles saem do conteúdo:

| O que | De onde vem |
| --- | --- |
| Contador ao lado de cada categoria | Quantidade de produtos naquela pasta |
| "Produtos" nas estatísticas | Total de análises publicadas |
| "Análises" | 1 por produto + cada depoimento |
| "Categorias" | Quantas categorias têm ao menos um produto |
| "Adicionados recentemente" | Os produtos com `date` mais recente |
| Ordem dentro da categoria | `date`, do mais novo para o mais antigo |
| Página da categoria vazia | Aparece quando a pasta não tem produto |
| Preço "pode ter mudado" | `checkedAt` com mais de 30 dias |

---

## Cores e tema

Todas as cores estão em **`src/styles/tokens.css`**, nos dois temas (escuro, que é o padrão, e claro). Mexa só ali — os componentes não têm cor escrita dentro deles, de propósito.

Depois de qualquer mudança de cor:

```bash
npm run check:contrast
```

Ele confere se o texto continua legível nos dois temas. **Se falhar, a cor não pode ir para o ar** — não é preciosismo: é o que garante leitura no sol, com viseira, e para quem enxerga menos.

A página `/styleguide` mostra a paleta, as fontes e os componentes montados. Ela existe só para consulta e não é indexada por buscadores.

---

## Antes de publicar

```bash
npm run build            # o site compila?
npx playwright test      # os testes passam?
npm run check:contrast   # as cores continuam legíveis?
```

Depois, com `npm run preview`, **abra a página que você mexeu e olhe**. Vale insistir nisso: neste projeto, dois defeitos bem visíveis passaram por todos os testes automatizados e só foram pegos olhando a tela. Teste automatizado confirma que a regra foi cumprida; ele não vê quando o resultado ficou feio.

Com tudo certo, é só commitar e dar push na `main` — o GitHub Actions publica sozinho.

---

## Regras que não podem ser quebradas

São poucas, e cada uma existe por um motivo concreto:

- **Cor só em `tokens.css`.** Cor escrita dentro de componente escapa da conferência de contraste e some do controle.
- **Toda foto precisa de `alt`.** É como quem usa leitor de tela sabe o que está vendo.
- **Textura nunca atrás de texto pequeno** (abaixo de 20px). O verificador de contraste mede cores chapadas; textura embaixo de texto mantém o número e destrói a garantia que ele representa.
- **Nunca use link direto de imagem de outro site.** Some sem avisar.
- **Todo texto visível em português.** Sem mistura.
- **Preço só com `checkedAt`.** Afirmar um preço sem dizer quando foi conferido é afirmar o que você não sabe.
- **Parceiro só depois do acordo.** Vale o mesmo para qualquer selo de apoio.
