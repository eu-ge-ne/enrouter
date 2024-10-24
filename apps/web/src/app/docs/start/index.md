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

![SPA React](/start-0.png "SPA React")

Your app contains only one page available at `/` location.
You can click the button and increment the counter.
Let's add another page.

Second page will have same layout but instead of incrementing the counter
the button should decrement it.

We are going to put first page at `/increment` and second at `/decrement`.
And, indeed, we need a home page at `/` location containing links to both pages.

Let's do it.

## Install enrouter

```bash
pnpm add -D enrouter
```

Add enrouter plugin to your Vite config:

```ts
// vite.config.ts

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import enrouter from 'enrouter/vite/plugin'; // import plugin

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    enrouter({ path: "src/app" }) // register plugin
  ],
})
```

`src/app` is a folder where you put your route components.

...

Will soon be updated...
