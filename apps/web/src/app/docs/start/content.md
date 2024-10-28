# Getting Started

## Scaffold project

Create new Vite project from `react-ts` template and run it:

```bash
pnpm create vite enrouter-demo --template react-ts

cd enrouter-demo

pnpm install
pnpm dev
```

You've got a basic single page React application with only one page
available at `/` where you can click a button and increment the counter:

![Start 0](/start-0.png "Start 0")

Let's add another page with same layout but different behavior: instead of
incrementing the counter the button will be decrementing it.

We will put original page at `/incr`.
The new page which you are going to create will be located at `/decr`.

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

[Vite Plugin](/docs/api/vite-plugin) explains why `virtual:enrouter` must be
added to `optimizeDeps.exclude`.

Last step of installing enrouter is to add `BrowserRouter` component to the
entry file `src/main.tsx`:

```tsx
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
    </StrictMode>,
  );
}

main();
```

## Define routes

Visit [Routes](/docs/api/routes) for more details about how routing works.

### \_layout.tsx

First, you need to create `_layout.tsx` file.
It defines common style and layout shared by child routes.
You can reuse existing `App.tsx` for style and layout and just add navigation
links.
Move `App.tsx` to `src/app/_layout.tsx` and modify it:

```tsx
// src/app/_layout.tsx

import { Outlet, useLink } from "enrouter";

import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import "./styles.css";

export default function Layout() {
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
          <a {...useLink("/incr")}>Increment</a>
        </li>
        <li>
          <a {...useLink("/decr")}>Decrement</a>
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

Also, move `App.css` to `src/app/styles.css` and add style for menu:

```css
/* src/app/styles.css */

/* ... */

.menu {
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 1rem;
}
```

### \_content.tsx

Finally, create `_content.tsx` files for `/incr` and `/decr` locations.
They are very similar with a few minor differences:

```tsx
// src/app/incr/_content.tsx

import { useState } from "react";

export default function Incr() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      <p>
        Edit <code>src/app/incr/_content.tsx</code> and save to test HMR
      </p>
    </>
  );
}
```

```tsx
// src/app/decr/_content.tsx

import { useState } from "react";

export default function Decr() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount((count) => count - 1)}>
        count is {count}
      </button>
      <p>
        Edit <code>src/app/decr/_content.tsx</code> and save to test HMR
      </p>
    </>
  );
}
```

Final result looks like this:

![Start 1](/start-1.png "Start 1")

## GitHub repository

Also, you can clone [examples](https://github.com/eu-ge-ne/enrouter-examples)
GitHub repo to your machine and play with it locally.
