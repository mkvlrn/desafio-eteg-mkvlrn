# desafio-eteg-mkvlrn

- [live](#live)
- [rodando localmente](#rodando-localmente)
  - [via compose](#via-compose)
  - [dev mode, somente db em container](#dev-mode-somente-db-em-container)
- [tecnicalidades](#tecnicalidades)
  - [monorepo](#monorepo)
  - [backend](#backend)
  - [frontend](#frontend)
  - [internal/domain](#internaldomain)
- [faq](#faq)
  - [_porque monorepo?_](#porque-monorepo)
  - [_usou AI?_](#usou-ai)
  - [_onde... estão os testes de frontend?_](#onde-estão-os-testes-de-frontend)
  - [_porque seu frontend parece um site de scam chinês?_](#porque-seu-frontend-parece-um-site-de-scam-chinês)

## live

<https://desafio-eteg-mkvlrn.up.railway.app>

## rodando localmente

### via compose

requisitos:

- docker (dev com 28.3.0)
- docker compose (dev com 2.38.2)

vai buscar imagens:

- postgres 17 (alpine, ~279MB)
- node 24 (alpine, ~165MB)
- nginx 1.29 (alpine, ~52MB)

```bash
docker compose up
```

acesso local em http://localhost:8080

### dev mode, somente db em container

requisitos:

- node 24 (22 lts funciona, mas foi desenvolvido no atual, 24.4.0)
- npm 11 (dev com 11.4.2)
- docker (dev com 28.3.0)
- docker compose (dev com 2.38.2)
- shell que aceite alguns comandos \*nix

crie um `.env` baseado no `.env.example` - valores do example já valem:

```bash
cp .env.example .env
```

instale packages do monorepo rodando _**no root to projeto**_:

```bash
npm i
```

inicie somente o postgres via container

```bash
docker compose up postgres
```

rode a task dev do monorepo, inicializa tanto backend quanto frontend

```bash
npm run dev
```

acesso local em http://localhost:3000

testes (unit e uma integração usando db real via container):

```bash
npm test
```

## tecnicalidades

### monorepo

combinação simples de [turborepo](https://github.com/vercel/turborepo) e [npm workspaces](https://docs.npmjs.com/cli/v11/using-npm/workspaces?v=true), usando importação de packages internos pra reuso de código e prevenção avançada de bagunça™

e mais:

- [vite](https://github.com/vitejs/vite) pra transpilagem tanto no frontend quanto no backend
- [vitest](https://github.com/vitest-dev/vitest) pra testes
- [biome](https://github.com/biomejs/biome) pra formatação e linting
- [husky](https://github.com/typicode/husky) pra execução de tasks via git hooks
- [commitlint](https://github.com/conventional-changelog/commitlint) pra lintar mensagens de commit porque somos todos civilizados

### backend

- [postgres](https://github.com/postgres/postgres) porque sim
- [hono](https://github.com/honojs/hono) como framework pra endpoints
- [prisma](https://github.com/prisma/prisma) como ORM
- [testcontainers](https://github.com/testcontainers/testcontainers-node) pra testes reais com banco em container efêmero

### frontend

- [react](https://github.com/facebook/react)
- [tailwind](https://github.com/tailwindlabs/tailwindcss)
- [react-toastify](https://github.com/fkhadra/react-toastify)
- [wouter](https://github.com/molefrog/wouter) como router - porque react-router ficou mais estranho que assistir cirque du soleil viajando no LSD
- [swr](https://github.com/vercel/swr) pra data fetching ao invés de react-query - porque eu quero data fetching, e não estudar pro meu PhD em teoria de invalidação de cache

### internal/domain

segue a ideia do clean architecture, mas sem virar culto. nada de criar `IUseCaseHandlerInterfaceFactory` ou enfiar cada arquivo em sua própria matrioska de pastas. separei bem os domínios, usei DTOs, resultados tipados, e schema validation onde importa — mas só o necessário pra manter o código limpo, testável e compreensível. clean, mas sem ser fanático.

pra isso:

- [zod](https://github.com/colinhacks/zod) - ALL HAIL
- [cpf-check](https://github.com/flasd/cpf-check) pra validar os CPFs - lib minúscula com 7 anos de idade, sem dependências, bem eficiente

e usei um tipo [Result](https://github.com/mkvlrn/desafio-eteg-mkvlrn/blob/main/internal/domain/src/utils/result.ts) inspirado em Go, pra evitar exception hell e tornar o fluxo de sucesso/erro mais explícito. cada função retorna ok ou error, e o consumidor decide o que fazer.

## faq

### _porque monorepo?_

parece overkill, mas é a resposta pra muita bagunça que se vê por aí - reuso de código e imports que funcionam

### _usou AI?_

nope. tudo isso aqui - incluindo esse readme - é 100% orgânico, digitado por uma mike alimentado à yakult e sucrilhos

### _onde... estão os testes de frontend?_

com mais tempo eles sairiam, eu prometo; mas com 2 dias de prazo, ficou impossível

### _porque seu frontend parece um site de scam chinês?_

porque eu sou péssimo em criar layouts - se me der uma spec, com tailwind eu faço bonito, mas se eu tiver que fazer o design, oof...
