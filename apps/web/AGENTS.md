<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
# ARCHITECTURE.md — Padrão de arquitetura Next.js

> Este documento define como os projetos Next.js deste autor são estruturados.
> **Ao criar ou alterar código, segue estas regras à risca.** Se algo não estiver
> coberto aqui, segue o espírito do padrão e pergunta antes de inventar uma nova estrutura.

> **Nota importante:** `products` (produtos, `ProductGrid`, `ProductItem`...) é usado
> **apenas como exemplo**. Cada projeto tem os seus próprios módulos de domínio
> (ex.: `tickets`, `orders`, `users`). Aplica o mesmo padrão a qualquer um deles.

---

## 1. Stack base

| Área | Escolha |
|---|---|
| Framework | Next.js (App Router, TypeScript) |
| Estilo | Tailwind CSS via **shadcn/ui** (já traz Tailwind e Lucide Icons) |
| Ícones | Lucide (`lucide-react`) |
| Cache e estado no cliente | TanStack Query (React Query) |
| Validação | Zod |
| Tema (dark/light) | `next-themes`, na integração oficial do shadcn/ui |
| SEO | Metadata API do Next.js |
| Dados de teste | Faker (`@faker-js/faker`) |
| i18n | Nativo do Next.js, **sem instalar bibliotecas** |

Idiomas iniciais: **português (`pt`)** e **inglês (`en`)**. Todas as apps são multilingues desde o início.

---

## 2. Estrutura de pastas

```
├── e2e/                              # testes ponta a ponta (Playwright)
└── src/
    ├── proxy.ts                      # redirecionamento por idioma
    ├── env.ts                        # validação de variáveis de ambiente (Zod)
    │
    ├── app/                          # SÓ rotas e estilos globais
    │   ├── [lang]/
    │   │   ├── layout.tsx
    │   │   └── page.tsx
    │   ├── favicon.ico
    │   ├── globals.css
    │   ├── robots.ts                 # SEO: regras para crawlers
    │   └── sitemap.ts                # SEO: sitemap (todos os idiomas)
    │
    ├── i18n/
    │   ├── dictionaries/             # nome em inglês
    │   │   ├── en.json
    │   │   └── pt.json
    │   ├── config.ts                 # lista de idiomas e idioma por defeito
    │   └── get-dictionary.ts         # carrega o JSON do idioma
    │
    ├── components/                   # componentes PARTILHADOS (ver secção 6)
    │   ├── ui/                       # shadcn/ui
    │   └── mode-toggle.tsx           # botão para alternar o tema (light/dark/system)
    │
    ├── lib/                          # utilitários globais (único `lib` do projeto)
    │   ├── utils.ts                  # cn() e afins
    │   └── seo.ts                    # helpers de metadata (títulos, alternates, OG)
    │
    ├── providers/                    # wrappers de contexto (ver secção 10)
    │   ├── app-providers.tsx         # junta todos os providers
    │   ├── query-provider.tsx        # React Query
    │   ├── theme-provider.tsx        # tema dark/light (next-themes)
    │   └── network-provider.tsx      # estado online/offline
    │
    └── features/                     # módulos de domínio
        └── products/                 # EXEMPLO de um módulo
            ├── index.ts              # API pública do módulo
            ├── components/
            │   └── product-grid/     # pasta própria por componente composto
            │       ├── product-grid.tsx
            │       ├── product-grid-skeleton.tsx
            │       ├── product-grid-content.tsx
            │       ├── product-item.tsx
            │       └── product-carousel.tsx
            ├── hooks/                # hooks (React Query, etc.)
            ├── mocks/                # dados falsos com Faker
            ├── keys.ts               # chaves do React Query
            ├── queries.ts            # leituras (server-only)
            ├── interactions.ts       # server actions (mutações)
            ├── types.ts
            └── schemas.ts            # schemas Zod
```

**Regra de crescimento:** `keys`, `queries`, `interactions`, `types` e `schemas` começam
**sempre como um único ficheiro**. Só viram pasta (`schemas/`, `types/`...) quando o
módulo crescer o suficiente para justificar. Não cries pastas ou ficheiros vazios "por hábito".

---

## 3. Multilingue (i18n)

- Usa o roteamento por idioma nativo do Next.js, com o segmento dinâmico `app/[lang]/`.
- `src/proxy.ts` deteta o idioma e redireciona (ex.: `/` → `/pt`). Em versões antigas do Next este ficheiro chamava-se `middleware.ts`.
- Os textos ficam em `src/i18n/dictionaries/{en,pt}.json`. **Nunca** escrevas texto visível ao utilizador diretamente nos componentes.
- `get-dictionary.ts` carrega o dicionário do idioma pedido. Os componentes server recebem o dicionário (ou a parte dele) por props.
- Ao adicionar uma chave, adiciona-a **em todos os idiomas**.
- `config.ts` é a única fonte da lista de idiomas e do idioma por defeito (usada também pelo `proxy.ts`).

---

## 4. Arquitetura por features (domínio)

Cada módulo de domínio vive em `src/features/<modulo>/` e contém **tudo** o que lhe pertence.

| Ficheiro / pasta | Responsabilidade |
|---|---|
| `index.ts` | API pública. Exporta só o que outros módulos podem usar |
| `components/` | Componentes do módulo |
| `hooks/` | Hooks do módulo (ex.: hooks do React Query) |
| `keys.ts` | Chaves do React Query do módulo |
| `queries.ts` | Funções de **leitura** executadas no servidor |
| `interactions.ts` | **Server actions** (`"use server"`): mutações e actions chamadas pelo cliente |
| `types.ts` | Tipos do domínio |
| `schemas.ts` | Schemas Zod do domínio (formulários, input das actions, respostas) |
| `mocks/` | Dados falsos gerados com Faker |

### Regras de fronteira

1. **Nenhum módulo importa de dentro de outro módulo.** A comunicação é só via `features/<outro>/index.ts`.
2. `app/` importa dos módulos e compõe páginas. Não contém lógica de domínio.
3. Os módulos podem importar de `components/`, `lib/`, `i18n/` e `providers/`. O contrário **não** acontece.
4. É em `queries.ts` e `interactions.ts` que se fala com a API externa ou, em apps full stack, diretamente com a base de dados (a lógica de backend fica aí).

### `queries.ts` vs `interactions.ts`

- **`queries.ts`**: funções async normais, com `import "server-only"`. São chamadas pelos componentes server (`*-content.tsx`). Aproveitam o cache do servidor (secção 7).
- **`interactions.ts`**: ficheiro com `"use server"`. Contém as mutações (criar, atualizar, apagar) e qualquer leitura que um componente **client** precise de pedir (por exemplo via React Query ou `useTransition`).
- Nota: server actions executam em fila e não aproveitam o cache como leituras normais. Por isso, **não uses server actions para leituras de componentes server**.

---

## 5. Regras de componentes

### 5.1 Componente renderizado no servidor (com dados)

Para um componente de listagem, ex.: `ProductGrid`, criam-se **quatro ficheiros** dentro de uma pasta própria:

| Ficheiro | Papel |
|---|---|
| `product-grid.tsx` | Ponto de entrada. Envolve o `Content` num `<Suspense fallback={<ProductGridSkeleton />}>` |
| `product-grid-skeleton.tsx` | Estado de carregamento (fallback do Suspense) |
| `product-grid-content.tsx` | Componente **server** async. Chama a query (`queries.ts`), obtém os dados iniciais e renderiza |
| `product-item.tsx` | Mostra **um** elemento da lista |

```tsx
// product-grid.tsx
export function ProductGrid() {
  return (
    <Suspense fallback={<ProductGridSkeleton />}>
      <ProductGridContent />
    </Suspense>
  );
}

// product-grid-content.tsx (server)
export async function ProductGridContent() {
  const products = await getProducts();
  return products.map((p) => <ProductItem key={p.id} product={p} />);
}
```

### 5.2 Parte interativa: componente client separado

Se parte da UI precisa de interação (ex.: um carrossel), cria-se **um componente client separado** (`product-carousel.tsx`, com `"use client"`):

- É renderizado **dentro** do `Content` (server).
- Recebe os **dados iniciais por props**, vindos da query do `Content`.
- O `Content` continua server; só a parte interativa passa para o cliente. Mantém o `"use client"` o mais em baixo possível na árvore.

### 5.3 Componente client que chama server actions

- Quando um componente client precisa de chamar uma server action, **usa `useTransition`** para controlar o estado de pending (lento, a carregar, desativar botões, etc.).
- Mostra feedback de loading com base no `isPending`.

### 5.4 Componente 100% client

- Se o componente inteiro (ex.: uma grid inteira) for renderizado no cliente, ele tem o **seu próprio skeleton**.
- O skeleton do Suspense (5.1) existe porque o componente é server. Um componente client não tem Suspense a fazer fallback, por isso o skeleton é gerido por ele próprio (ex.: enquanto o React Query carrega).

### 5.5 Organização em pastas

- Se um componente é composto por **vários ficheiros** que pertencem só a ele (como o `ProductGrid`), cria-se **uma pasta própria** dentro de `components/` com o nome dele (`product-grid/`, ou simplesmente `grid/`).
- Componentes simples e isolados podem ficar soltos em `components/`.

---

## 6. Componentes partilhados (`src/components`)

Um componente vai para `src/components/` (raiz) quando cumpre **todas** estas condições:

1. É usado por **mais de um módulo** (ou é claramente genérico, como um botão).
2. **Não faz uso de nenhuma server action**.
3. **Não depende de tipos, queries ou regras de um domínio** específico.

Exemplos: botões genéricos, inputs, modais, badges, o que vem do shadcn em `components/ui/`.

**Ficam no módulo (mesmo parecendo genéricos)** os componentes que:

- usam uma server action (ex.: um botão "adicionar ao carrinho" que chama `addToCart`);
- dependem de tipos ou lógica do domínio;
- têm uma característica própria só daquele módulo.

**Regra prática:** começa dentro do módulo. Quando um segundo módulo precisar do mesmo componente e ele cumprir as três condições, **sobe** para `src/components/`. Se outro módulo precisar de um componente que depende de domínio, exporta-o pelo `index.ts` do módulo dono em vez de o duplicar.

---

## 7. Cache

### 7.1 Cache no servidor (Next.js)

- As leituras (`queries.ts`) são o ponto onde se decide o cache. Mantém a decisão de cache **dentro das queries**, não espalhada pelos componentes.
- Para dados reutilizados no mesmo pedido, deduplica com `cache()` do React.
- Para cache entre pedidos, usa o mecanismo de cache da versão do Next em uso. Em versões recentes com **Cache Components** ativado: a diretiva `"use cache"` com `cacheLife` (duração) e `cacheTag` (etiqueta). Confirma sempre a documentação da versão instalada, porque este tema muda entre versões.
- Dá **tags** consistentes por domínio/recurso (ex.: `products`, `product-<id>`).
- As mutações (`interactions.ts`) **invalidam** o cache afetado depois de gravar, via `revalidateTag` / `updateTag` (ou `revalidatePath`), conforme o caso.
- Dados específicos do utilizador (cookies, sessão) **não** entram em cache partilhado.

### 7.2 Cache no cliente (React Query)

- Usado nos componentes **client** que precisam de dados que mudam ou são pedidos depois do carregamento.
- **Chaves** centralizadas em `keys.ts`, em forma de fábrica, nunca strings soltas:

```ts
export const productKeys = {
  all: ["products"] as const,
  list: (filters?: ProductFilters) => [...productKeys.all, "list", filters] as const,
  detail: (id: string) => [...productKeys.all, "detail", id] as const,
};
```

- Os hooks em `hooks/` encapsulam o `useQuery` / `useMutation`, usando as chaves de `keys.ts`.
- Define `staleTime` de forma consciente por tipo de dado.
- Depois de uma mutação, invalida as chaves afetadas (`queryClient.invalidateQueries`).
- Os **dados iniciais** vindos do servidor podem ser passados por props e usados como `initialData`, evitando um pedido duplicado no primeiro render.
- O `QueryClientProvider` vive em `src/providers/query-provider.tsx` e é importado no layout.

### 7.3 Quem cuida de quê

| Situação | Ferramenta |
|---|---|
| Dados iniciais da página, renderizados no servidor | `queries.ts` + cache do Next |
| Dados que o cliente pede/atualiza depois | React Query + server action em `interactions.ts` |
| Depois de mutar | Invalidar o cache do servidor **e** as chaves do React Query |

---

## 8. Dados falsos (Faker)

- Cada módulo tem a sua pasta `mocks/` com funções que geram dados com Faker, respeitando os tipos de `types.ts`.
- `queries.ts` e `interactions.ts` podem consumir os mocks para testar a app **enquanto não há API ou base de dados reais**.
- A troca entre mocks e dados reais é controlada por uma variável de ambiente (ex.: `USE_MOCKS=true`), validada em `env.ts`. O código real e o mock **não** se misturam no mesmo bloco, ficam atrás desta troca.
- Usa `faker.seed(<número>)` para os dados serem estáveis. Isto evita erros de hidratação e testes instáveis.

---

## 9. Validação e ambiente

- **Zod** valida: formulários, input de server actions, respostas de APIs externas e variáveis de ambiente.
- `src/env.ts` valida as variáveis ao arrancar. Se faltar uma obrigatória, o build/arranque falha logo.
- Os tipos TypeScript dos schemas são derivados com `z.infer`, sem duplicar à mão.

---

## 10. Providers

Todos vivem em `src/providers/` e são juntos em **`app-providers.tsx`**, que é o único que o `app/[lang]/layout.tsx` importa. Não pôr providers soltos no layout.

```tsx
// providers/app-providers.tsx
"use client";

import { Toaster } from "@/components/ui/sonner";

export function AppProviders({ children, networkDictionary }: AppProvidersProps) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <NetworkProvider dictionary={networkDictionary}>
          {children}
          <Toaster richColors closeButton position="bottom-right" />
        </NetworkProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
```

### 10.1 `query-provider.tsx`
`QueryClientProvider` do React Query (secção 7.2).

### 10.2 `theme-provider.tsx` (dark / light)
- Usa o **`next-themes`**, que é o que o **shadcn/ui** já traz na sua integração de dark mode. Segue a configuração da documentação oficial do shadcn para Next.js.
- Configuração base: `attribute="class"`, `defaultTheme="system"`, `enableSystem`, `disableTransitionOnChange`.
- No `<html>` do layout, adiciona `suppressHydrationWarning` (exigido pelo `next-themes` para evitar aviso de hidratação).
- O botão de alternar o tema é o componente **`mode-toggle.tsx`** (versão do shadcn: menu com *Light*, *Dark* e *System*), em `src/components/` por ser partilhado e não usar server actions. Os textos dele vão para os dicionários.
- Estilos: usa as variáveis de cor do shadcn (`bg-background`, `text-foreground`, etc.) e classes `dark:` do Tailwind. **Não** uses cores fixas que quebrem o dark mode.

### 10.3 `network-provider.tsx` (online / offline)
- Provider **client** que deteta se a app está online ou offline com `navigator.onLine` e os eventos `online` / `offline` do `window`.
- Expõe um contexto com `isOnline` e um hook `useNetworkStatus()` (em `hooks/` ou no próprio ficheiro).
- Ao perder ligação, mostra um aviso visível (toast ou banner com componentes do shadcn); ao voltar, avisa que a ligação voltou. Os textos vêm dos dicionários.
- Estado inicial seguro para SSR: assume `true` no servidor e atualiza no cliente após montar (evita erro de hidratação).
- Integra com o React Query através do `onlineManager`, para pausar e retomar pedidos conforme a ligação.
- Componentes client que fazem mutações podem usar `isOnline` para desativar ações quando estiver offline.

---

## 11. SEO

O SEO é importante e deve ser tratado **desde o início**, não no fim.

- **Metadata API do Next.js**: cada página/layout exporta `metadata` ou `generateMetadata`. Em páginas com `[lang]`, o `generateMetadata` carrega o dicionário e devolve título e descrição **no idioma da página**. Os textos de SEO ficam nos dicionários, como todos os outros.
- **Helpers em `src/lib/seo.ts`**: funções que montam a metadata comum (título com template, `openGraph`, `twitter`, `alternates`), para as páginas não repetirem código.
- **Idiomas**: `<html lang={lang}>` no layout. `alternates.canonical` e `alternates.languages` (hreflang) em cada página, apontando para as versões `pt` e `en`. Usa `generateStaticParams` para gerar as rotas por idioma.
- **`sitemap.ts` e `robots.ts`** em `src/app/`. O sitemap inclui **todas as páginas em todos os idiomas**, com as alternativas.
- **Open Graph / Twitter**: título, descrição e imagem por página (`opengraph-image` ou imagem estática).
- **Dados estruturados (JSON-LD)** nas páginas onde fizer sentido (produto, evento, organização, artigo), via `<script type="application/ld+json">`.
- **Estrutura da página**: HTML semântico, **um único `<h1>`** por página, hierarquia de títulos correta, links com texto descritivo.
- **Performance conta para SEO**: usa `next/image` (com `alt` sempre preenchido) e `next/font`, e prefere conteúdo renderizado no servidor (o padrão de componentes da secção 5 ajuda).
- Páginas privadas ou sem valor para pesquisa levam `robots: { index: false }`.
- Nunca deixar uma página sem `title` e `description`.

---

## 12. Testes

- Testes unitários e de componente ficam **ao lado** do código (`product-item.test.tsx`).
- Testes ponta a ponta ficam em `e2e/` na raiz.

---

## 13. Convenções gerais

- Ficheiros e pastas em `kebab-case`; componentes React em `PascalCase`.
- Componentes são **server por defeito**. Só adiciona `"use client"` quando houver interação, estado ou APIs do browser.
- Nunca escrever texto visível ao utilizador fora dos dicionários.
- Estilos com Tailwind e componentes do shadcn/ui. Ícones do Lucide. Todo o estilo deve funcionar em light e dark.
- Antes de criar um componente, verifica se já existe em `src/components/ui/` (shadcn) ou no módulo.

---

## 14. Checklist para criar um novo módulo

1. Criar `src/features/<modulo>/` com `index.ts`, `types.ts`, `schemas.ts`, `keys.ts`, `queries.ts`, `interactions.ts`.
2. Criar `mocks/` com dados do Faker e ligar às queries/interactions via `USE_MOCKS`.
3. Criar a pasta do componente principal com `Grid/List` (Suspense), `Skeleton`, `Content` e `Item`.
4. Se houver interação, criar o componente client separado e passar-lhe os dados iniciais por props.
5. Se o cliente precisar de dados dinâmicos, criar o hook em `hooks/` com as chaves de `keys.ts`.
6. Adicionar as chaves de texto em **todos** os dicionários de `src/i18n/dictionaries/`.
7. Definir a metadata de SEO das páginas do módulo (`generateMetadata`, com textos dos dicionários).
8. Exportar pelo `index.ts` só o que for público.
