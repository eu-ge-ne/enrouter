import { useLocation } from "enrouter";

import { log } from "#log.js";

export default {
  Main() {
    log("Rendering: /_end#Main");

    const location = useLocation();

    return <div>{location} is not found</div>;
  },
};
