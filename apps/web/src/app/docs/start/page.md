# Getting Started

## Scaffold project

Let's create new Vite project from `react-ts` template and run it:

```bash
pnpm create vite enrouter-demo --template react-ts

cd enrouter-demo

pnpm install
pnpm dev
```

You've got a basic single page React application with only one page
available at `/` where you can click a button and increment the counter:

![react SPA](/start-0.png "react SPA")

Let's add another page with same layout but different behavior.
Instead of incrementing the counter the button will be decrementing it.

We will put original page at `/increment`. The new page which you are going to
create will be located at `/decrement`.

And, indeed, we need a home page containing links to both pages.

## Install enrouter

```bash
pnpm add -D enrouter
```

Add enrouter plugin to your `vite.config.ts`:

```ts
// vite.config.ts

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import enrouter from "enrouter/vite/plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), enrouter({ path: "src/app" })],
  optimizeDeps: {
    exclude: ["virtual:enrouter"],
  },
});
```

`src/app` is a folder where you put your route components.

[Vite Plugin](/docs/vite/plugin) explains why you need to add `virtual:enrouter`
to `optimizeDeps.exclude`.

Last step of installing enrouter is to add `BrowserRouter` component to the
entry file `src/main.tsx`:

```ts
// src/main.tsx

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { matchLocation, BrowserRouter } from "enrouter";

import "./index.css";

async function main() {
  const match = await matchLocation(window.location.pathname);

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <BrowserRouter match={match} />
    </StrictMode>
  );
}

main();
```

## Define routes

### \_root.tsx

First, you need to create `_root.tsx` file.
It defines common style and layout shared by all routes.
You can reuse existing `App.tsx` for style and layout and just add navigation
links.
Move and change `App.tsx` to `src/app/_root.tsx`:

```ts
// src/app/_root.tsx

import { Outlet, useLink } from "enrouter";

import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import "./root.css";

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
        <li>
          <a {...useLink("/")}>Home</a>
        </li>
        <li>
          <a {...useLink("/increment")}>Increment</a>
        </li>
        <li>
          <a {...useLink("/decrement")}>Decrement</a>
        </li>
      </ul>
      <div className="card">
        <Outlet />
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}
```

Also, move `App.css` to `src/app/root.css` and add style for menu:

```css
/* src/app/root.css */

/* ... */

.menu {
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 1rem;
}
```

### \_page.tsx

# TODO

Finally, create `_page.tsx` files for `/increment` and `/decrement`
locations.
They are very similar with few minor differences.

`src/app/increment/_page.tsx`:

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

`src/app/decrement/_page.tsx`:

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
