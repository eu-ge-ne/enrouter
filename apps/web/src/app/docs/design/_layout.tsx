import { createLog } from "#log.js";
import Content from "./content.mdx";

const log = createLog("docs/design/_layout");

export const components = {
  docs: Layout,
};

function Layout() {
  log("Rendering");

  return <Content />;
}
