import { hydrateRoot } from "react-dom/client";

import "./index.css";

import {
  buildRoutesWithViteManifest,
  buildRouteHandlers,
  loadRouteMatches,
  matchRoutes,
  BrowserRouter,
  debug,
} from "enrouter";
import { Shell } from "./shell.js";
import { createLog } from "#log.js";
//@ts-ignore
import { modules } from "virtual:routeModules";

debug(console.debug);

const log = createLog("main");

declare const window: {
  location: Location;
};

async function main() {
  log("Hydrating DOM");

  const routes = buildRoutesWithViteManifest({ modules });
  if (!routes) {
    throw new Error("No routes found");
  }

  const handlers = buildRouteHandlers(routes);

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
