import { createLog } from "#log.js";

const log = createLog("app/_index");

export const components = {
  main: Home,
};

function Home() {
  log("Rendering");

  return <div className="p-4">TODO: HOME</div>;
}
