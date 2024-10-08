import { createLog } from "#log.js";
import Content from "./content.mdx";

const log = createLog("docs/_index");

export const components = {
  docs: Index,
};

function Index() {
  log("Rendering");

  return <Content />;
}
