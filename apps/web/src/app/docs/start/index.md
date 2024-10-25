# Getting Started

## Scaffold Vite project

First, create a new Vite project from `react-ts` template:

```bash
pnpm create vite enrouter-demo --template react-ts

cd enrouter-demo

pnpm install
```

And run it:

```bash
pnpm dev
```

You've created a basic single page React application:

![react SPA](/start-0.png "react SPA")

Your app contains only one page available at `/` location.
You can click the button and increment the counter.
Let's add another page.

Second page will have same layout but instead of incrementing the counter the
button will be decrementing it.

We are going to put first page at `/increment` and second at `/decrement`.
And, indeed, we need a home page at `/` location containing links to both pages.

## Install enrouter

```bash
pnpm add -D enrouter
```

Add **enrouter** plugin to your Vite config:

```ts
// vite.config.ts

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import enrouter from "enrouter/vite/plugin"; // import plugin

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    enrouter({ path: "src/app" }), // register plugin
  ],
  optimizeDeps: {
    exclude: ["virtual:enrouter"], // do not optimize "virtual:enrouter" module
  },
});
```

`src/app` is a folder where you put your route components.

**enrouter** creates internal "virtual" module with name `virtual:enrouter`
where it is generating and storing your route tree.
You need to add `virtual:enrouter` module to `optimizeDeps.exclude` because
the notion of "virtual" module does exist only in Rollup and does not exist in
esbuild.

Vite is using Rollup for producing final bundle for prod.
But during development it uses two budlers: Rollup for compiling user code
and esbuild for for precompiling your `node_modules` dependencies
(`optimizeDeps`).
That's why we need to set `optimizeDeps.exclude`. To tell esbuild that
`virtual:enrouter` is handled somewhere else (by Rollup).

Last step of installing **enrouter** is to render `enrouter.Browser` component
in `src/main.tsx`:

```ts
// src/main.tsx

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as enrouter from 'enrouter'; // import enrouter

async function main() {
  // match initial window.location
  const match = await enrouter.matchLocation(window.location.pathname);

  // render router component
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <enrouter.Browser match={match} />
    </StrictMode>,
  )
}

main();
```
