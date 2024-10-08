import { useLocation } from "enrouter";

import { createLog } from "#log.js";

const log = createLog("_notFound");

export const components = {
  main: NotFound,
};

function NotFound() {
  log("Rendering");

  const location = useLocation();

  return <div>{location} is not found</div>;
}
