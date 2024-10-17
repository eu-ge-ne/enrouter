import { createLog } from "#log.js";
import Index from "./index.md";

const log = createLog("docs/api/_index");

export default {
  Api,
};

function Api() {
  log("Rendering");

  return <Index />;
}
