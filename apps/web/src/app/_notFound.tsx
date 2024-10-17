import { useLocation } from "enrouter";

import { createLog } from "#log.js";

const log = createLog("_notFound");

export default {
  Main,
};

function Main() {
  log("Rendering");

  const location = useLocation();

  return <div>{location} is not found</div>;
}
