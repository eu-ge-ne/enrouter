import { useLocation } from "enrouter";

import { log } from "#log.js";

export default {
  Docs() {
    log("Rendering: /docs/_notFound#Docs");

    const location = useLocation();

    return <div>docs: {location} is not found</div>;
  },
};
