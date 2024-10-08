import { createLog } from "#log.js";
import Content from "./content.mdx";

const log = createLog("app/docs/api/_layout");

export const components = {
  docs: DocsApiLayout,
};

function DocsApiLayout() {
  log("Rendering");

  return (
    <div className="p-4">
      <Content />
    </div>
  );
}
