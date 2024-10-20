import { hydrateRoot } from "react-dom/client";
import * as enrouter from "enrouter";
//@ts-ignore
import { routes } from "virtual:enrouter";

import "./index.css";
import { log } from "#log.js";
import { Shell } from "./shell.js";

enrouter.debug(console.debug);

declare const window: {
  location: Location;
};

async function main() {
  log("Hydrating DOM");

  const matches = enrouter.match({
    routes,
    location: window.location.pathname,
  });

  await enrouter.load(matches);

  hydrateRoot(
    document,
    <Shell>
      <enrouter.Browser routes={routes} matches={matches} />
    </Shell>,
  );

  log("DOM Hydrated");
}

main();
