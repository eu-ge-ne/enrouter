import { createLog } from "#log.js";
import Content from "./content.mdx";

const log = createLog("app/docs/design/_layout");

export const components = {
  docs: DocsDesignLayout,
};

function DocsDesignLayout() {
  log("Rendering");

  return (
    <div className="p-4">
      <Content />
    </div>
  );
}
