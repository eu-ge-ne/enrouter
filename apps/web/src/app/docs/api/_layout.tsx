import { Outlet } from "enrouter";

import { createLog } from "#log.js";

const log = createLog("docs/api/_layout");

export const components = {
  docs: Layout,
};

function Layout() {
  log("Rendering");

  return <Outlet name="api" />;
}
