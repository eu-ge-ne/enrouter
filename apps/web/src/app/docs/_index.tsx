import { createLog } from "#log.js";
import Index from "./index.md";

const log = createLog("docs/_index");

export const components = {
  Docs,
};

function Docs() {
  log("Rendering");

  return <Index />;
}
