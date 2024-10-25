import { hydrateRoot } from "react-dom/client";
import * as enrouter from "enrouter";

import "./index.css";
import { log } from "#log.js";
import { Shell } from "./shell.js";

enrouter.debug(console.debug);

declare const window: {
  location: Location;
};

async function main() {
  log("Hydrating DOM");

  const match = await enrouter.matchLocation(window.location.pathname);

  hydrateRoot(
    document,
    <Shell>
      <enrouter.BrowserRouter match={match} />
    </Shell>,
  );

  log("DOM Hydrated");
}

main();
