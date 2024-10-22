import { Outlet } from "enrouter";

import { log } from "#log.js";

export default function Root() {
  log("Rendering: /login/_root");

  return <Outlet here />;
}
