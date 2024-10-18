import { hydrateRoot } from "react-dom/client";
import { debug, matchRoutes, loadMatches, BrowserRouter } from "enrouter";

import "./index.css";
import { log } from "#log.js";
//@ts-ignore
import { routes } from "virtual:routes";
import { Shell } from "./shell.js";

debug(console.debug);

declare const window: {
  location: Location;
};

async function main() {
  log("Hydrating DOM");

  const matches = matchRoutes({ routes, location: window.location.pathname });
  await loadMatches(matches);

  hydrateRoot(
    document,
    <Shell>
      <BrowserRouter routes={routes} matches={matches} />
    </Shell>,
  );

  log("DOM Hydrated");
}

main();
