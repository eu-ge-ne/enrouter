import { useLocation } from "enrouter";

import { log } from "#log.js";

export default function Void() {
  log("Rendering: /_void");

  const location = useLocation();

  return <div>{location} is not found</div>;
}
