import { createLog } from "#log.js";
import Content from "./content.md";

const log = createLog("docs/arch/_layout");

export const components = {
  arch: Layout,
};

function Layout() {
  log("Rendering");

  return <Content />;
}
