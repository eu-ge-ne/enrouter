import { createLog } from "#log.js";
import Index from "./index.md";

const log = createLog("docs/arch/_layout");

export const components = {
  arch: Layout,
};

function Layout() {
  log("Rendering");

  return <Index />;
}
