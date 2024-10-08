import { createLog } from "#log.js";

const log = createLog("app/docs/api/_layout");

export const components = {
  docs: DocsApi,
};

function DocsApi() {
  log("Rendering");

  return <div className="p-4">TODO: DOCS API</div>;
}
