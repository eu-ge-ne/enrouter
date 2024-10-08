import { createLog } from "#log.js";

const log = createLog("app/docs/_index");

export const components = {
  docs: DocsIndex,
};

function DocsIndex() {
  log("Rendering");

  return <div className="p-4">TODO: DOCS</div>;
}
