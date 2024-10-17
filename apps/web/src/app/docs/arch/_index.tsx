import { createLog } from "#log.js";
import Index from "./index.md";

const log = createLog("docs/arch/_layout");

export const components = {
  Arch,
};

function Arch() {
  log("Rendering");

  return <Index />;
}
