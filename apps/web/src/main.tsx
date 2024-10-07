import { hydrateRoot } from "react-dom/client";

import "./index.css";

import {
  buildRouteHandlers,
  loadRouteMatches,
  matchRoutes,
  BrowserRouter,
} from "enrouter";
import { Shell } from "./shell.js";
import { modules } from "./routes.js";

import type { Route } from "enrouter";

declare const window: {
  $ROUTES: Route;
  location: Location;
};

async function main() {
  console.log("Hydrating DOM");

  const handlers = buildRouteHandlers({ routes: window.$ROUTES });

  const matches = matchRoutes({ handlers, location: window.location.pathname });
  await loadRouteMatches({ matches, modules });

  hydrateRoot(
    document,
    <Shell>
      <BrowserRouter handlers={handlers} modules={modules} />
    </Shell>
  );

  console.log("DOM Hydrated");
}

main();
