import { createLog } from "#log.js";
import Content from "./content.mdx";

const log = createLog("app/_index");

export const components = {
  main: AppIndex,
};

function AppIndex() {
  log("Rendering");

  return (
    <div className="p-4">
      <Content />
    </div>
  );
}
