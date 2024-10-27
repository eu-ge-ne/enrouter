import { useLocation } from "enrouter";

import { log } from "#log.js";

export default function Outlets() {
  log("Rendering: /_outlets");

  const location = useLocation();

  return <div>{location} is not found</div>;
}
