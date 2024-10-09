import { createLog } from "#log.js";

const log = createLog("_index");

export const components = {
  main: Index,
};

function Index() {
  log("Rendering");

  return "TODO";
}
