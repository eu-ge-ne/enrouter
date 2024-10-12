import { hydrateRoot } from "react-dom/client";

import "./index.css";

import {
  buildRouteHandlers,
  loadRouteMatches,
  matchRoutes,
  BrowserRouter,
  debug,
} from "enrouter";
import { Shell } from "./shell.js";
import { modules } from "./modules.js";
import { createLog } from "#log.js";

import type { Route } from "enrouter";

debug(console.debug);

const log = createLog("main");

declare const window: {
  $ROUTES: Route;
  location: Location;
};

async function main() {
  log("Hydrating DOM");

  const handlers = buildRouteHandlers(window.$ROUTES);

  const matches = matchRoutes({ handlers, location: window.location.pathname });
  await loadRouteMatches({ matches, modules });

  hydrateRoot(
    document,
    <Shell>
      <BrowserRouter handlers={handlers} modules={modules} />
    </Shell>,
  );

  log("DOM Hydrated");
}

main();
