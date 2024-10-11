import { createLog } from "#log.js";
import Content from "./content.mdx";

const log = createLog("docs/start/_layout");

export const components = {
  docs: Layout,
};

function Layout() {
  log("Rendering");

  return <Content />;
}
