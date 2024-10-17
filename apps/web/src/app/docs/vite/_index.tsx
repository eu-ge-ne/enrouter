import { createLog } from "#log.js";
import Index from "./index.md";

const log = createLog("docs/vite/_index");

export const components = {
  vite: Vite,
};

function Vite() {
  log("Rendering");

  return <Index />;
}
