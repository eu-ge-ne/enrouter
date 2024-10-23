import { Outlet } from "enrouter";

import { log } from "#log.js";

export default function Root() {
  log("Rendering: /_root");

  return <Outlet root />;
}
