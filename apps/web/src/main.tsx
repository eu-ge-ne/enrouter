import { hydrateRoot } from "react-dom/client";
import { debug, matchRoutes, prepareMatches, BrowserRouter } from "enrouter";

import "./index.css";
import { createLog } from "#log.js";
//@ts-ignore
import { routes } from "virtual:routes";
import { Shell } from "./shell.js";

debug(console.debug);

const log = createLog("main");

declare const window: {
  location: Location;
};

async function main() {
  log("Hydrating DOM");

  const matches = matchRoutes({ routes, location: window.location.pathname });
  await prepareMatches(matches);

  hydrateRoot(
    document,
    <Shell>
      <BrowserRouter routes={routes} matches={matches} />
    </Shell>,
  );

  log("DOM Hydrated");
}

main();
