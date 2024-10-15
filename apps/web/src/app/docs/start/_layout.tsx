import { createLog } from "#log.js";
import Index from "./index.mdx";

const log = createLog("docs/start/_layout");

export const components = {
  docs: Layout,
};

function Layout() {
  log("Rendering");

  return <Index />;
}
