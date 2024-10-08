import { useLocation } from "enrouter";

import { createLog } from "#log.js";

const log = createLog("app/_notFound");

export const components = {
  main: NotFound,
};

function NotFound() {
  log("Rendering");

  const location = useLocation();

  return `${location} is not found`;
}
