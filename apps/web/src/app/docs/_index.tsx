import { createLog } from "#log.js";
import Content from "./content.mdx";

const log = createLog("app/docs/_index");

export const components = {
  docs: DocsIndex,
};

function DocsIndex() {
  log("Rendering");

  return (
    <div className="p-4">
      <Content />
    </div>
  );
}
