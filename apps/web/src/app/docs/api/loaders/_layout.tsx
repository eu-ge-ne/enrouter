import { createLog } from "#log.js";
import Content from "./content.md";

const log = createLog("docs/api/loaders/_layout");

export const components = {
  api: Layout,
};

function Layout() {
  log("Rendering");

  return <Content />;
}
