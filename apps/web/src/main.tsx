import { hydrateRoot } from "react-dom/client";

import "./index.css";

import { loadRouteMatches, matchRoutes, BrowserRouter, debug } from "enrouter";
import { Shell } from "./shell.js";
import { createLog } from "#log.js";
//@ts-ignore
import { routes } from "virtual:routes";

debug(console.debug);

const log = createLog("main");

declare const window: {
  location: Location;
};

async function main() {
  log("Hydrating DOM");

  const matches = matchRoutes({ routes, location: window.location.pathname });
  await loadRouteMatches({ matches });

  hydrateRoot(
    document,
    <Shell>
      <BrowserRouter routes={routes} />
    </Shell>,
  );

  log("DOM Hydrated");
}

main();
