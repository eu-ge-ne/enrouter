import { createLog } from "#log.js";
import Content from "./content.md";

const log = createLog("docs/architecture/_layout");

export const components = {
  docs: Layout,
};

function Layout() {
  log("Rendering");

  return <Content />;
}
