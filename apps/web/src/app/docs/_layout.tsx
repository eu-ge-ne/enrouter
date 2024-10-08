import { createLog } from "#log.js";

const log = createLog("app/docs/_layout");

export const components = {
  main: Docs,
};

function Docs() {
  log("Rendering");

  return <div>DOCS</div>;
}
