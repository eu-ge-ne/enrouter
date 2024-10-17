import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

import "./index.css";

import { renderMatches, matchRoutes, BrowserRouter, debug } from "enrouter";
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
  await renderMatches(matches);

  hydrateRoot(
    document,
    <StrictMode>
      <BrowserRouter routes={routes} matches={matches} />
    </StrictMode>,
  );

  log("DOM Hydrated");
}

main();
