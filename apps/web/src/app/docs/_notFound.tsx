import { useLocation } from "enrouter";

import { createLog } from "#log.js";

const log = createLog("docs/_notFound");

export const components = {
  Docs,
};

function Docs() {
  log("Rendering");

  const location = useLocation();

  return <div>{location} is not found</div>;
}
