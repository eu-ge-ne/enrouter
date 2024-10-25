# Getting Started

## Scaffold project

First, create new Vite project from `react-ts` template:

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
But during development it is using two bundlers: Rollup for compiling your code
and esbuild for precompiling dependencies in `node_modules` folder.
That's why we need to use `optimizeDeps.exclude`. To tell esbuild to
ignore `virtual:enrouter` and do not try to compile it, because it is handled
somewhere else (by Rollup).

Last step of installing **enrouter** is to render `enrouter.Browser` component
in `src/main.tsx`:

```ts
// src/main.tsx

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as enrouter from 'enrouter'; // import enrouter

import './index.css'

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

## Define routes

### \_root.tsx

First, you need to create at least one `_root.tsx` file.
Its purpose is to define common style and layout shared by child routes.

In our case `_root.tsx` imports common styles, defines common layout (salvaged
from `App.tsx`) and renders navigation links. Move and rename `App.tsx` to
`src/app/_root.tsx` and change it to look like:

```ts
// src/app/_root.tsx

import { Outlet, useLink } from "enrouter";

import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import './root.css'

export default function Root() {

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <ul className="menu">
        <li><a {...useLink("/")}>Home</a></li>
        <li><a {...useLink("/increment")}>Increment</a></li>
        <li><a {...useLink("/decrement")}>Decrement</a></li>
      </ul>
      <div className="card">
        <Outlet />
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}
```

Also, move and rename `App.css` to `src/app/root.css` and add style for menu:

```css
/* src/app/root.css */

... .menu {
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 1rem;
}
```

### \_page.tsx

Next, create `_page.tsx` files for `/increment` and `/decrement`
locations.

The `src/app/increment/_page.tsx` should look like:

```ts
import { useState } from 'react'

export default function Increment() {
  const [count, setCount] = useState(0)

  return (
    <>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      <p>
        Edit <code>src/app/increment/_page.tsx</code> and save to test HMR
      </p>
    </>
  )
}
```

The `src/app/decrement/_page.tsx` is very similar with minor difference:

```ts
import { useState } from 'react'

export default function Increment() {
  const [count, setCount] = useState(0)

  return (
    <>
      <button onClick={() => setCount((count) => count - 1)}>
        count is {count}
      </button>
      <p>
        Edit <code>src/app/decrement/_page.tsx</code> and save to test HMR
      </p>
    </>
  )
}
```
