import { createLog } from "#log.js";
import Content from "./content.mdx";

const log = createLog("_index");

export const components = {
  main: Index,
};

function Index() {
  log("Rendering");

  return (
    <div className="p-4">
      <Content />
    </div>
  );
}
