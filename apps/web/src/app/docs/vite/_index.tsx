import { createLog } from "#log.js";
import Index from "./index.md";

const log = createLog("docs/vite/_index");

export default {
  Vite,
};

function Vite() {
  log("Rendering");

  return <Index />;
}
