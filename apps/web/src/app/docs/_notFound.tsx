import { useLocation } from "enrouter";

import { createLog } from "#log.js";

const log = createLog("app/docs/_notFound");

export const components = {
  docs: NotFound,
};

function NotFound() {
  log("Rendering");

  const location = useLocation();

  return <div className="p-4">{location} is not found</div>;
}
