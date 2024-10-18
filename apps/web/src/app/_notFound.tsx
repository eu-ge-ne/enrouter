import { useLocation } from "enrouter";

import { log } from "#log.js";

export default {
  Main() {
    log("Rendering: /_notFound#Main");

    const location = useLocation();

    return <div>{location} is not found</div>;
  },
};
