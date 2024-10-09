import { createLog } from "#log.js";
import Content from "./content.mdx";

const log = createLog("docs/api/assets/_layout");

export const components = {
  api: Layout,
};

function Layout() {
  log("Rendering");

  return <Content />;
}
