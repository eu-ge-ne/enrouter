import { hydrateRoot } from "react-dom/client";
import * as enrouter from "enrouter";
//@ts-ignore
import routes from "virtual:enrouter/vite/routes";

import "./index.css";
import { log } from "#log.js";
import { Shell } from "./shell.js";

enrouter.debug(console.debug);

declare const window: {
  location: Location;
};

async function main() {
  log("Hydrating DOM");

  const match = await enrouter.createMatch({
    routes,
    location: window.location.pathname,
  });

  hydrateRoot(
    document,
    <Shell>
      <enrouter.Browser routes={routes} match={match} />
    </Shell>,
  );

  log("DOM Hydrated");
}

main();
