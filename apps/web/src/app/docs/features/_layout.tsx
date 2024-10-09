import { createLog } from "#log.js";
import Content from "./content.mdx";

const log = createLog("app/docs/features/_layout");

export const components = {
  docs: DocsFeaturesLayout,
};

function DocsFeaturesLayout() {
  log("Rendering");

  return <Content />;
}
