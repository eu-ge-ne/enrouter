import { hydrateRoot } from "react-dom/client";

import "./index.css";

import { loadRouteMatches, matchRoutes, BrowserRouter, debug } from "enrouter";
import { Shell } from "./shell.js";
import { createLog } from "#log.js";
//@ts-ignore
import { modules, handlers } from "virtual:routes";

debug(console.debug);

const log = createLog("main");

declare const window: {
  location: Location;
};

async function main() {
  log("Hydrating DOM");

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
