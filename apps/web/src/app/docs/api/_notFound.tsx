import { useLocation } from "enrouter";

import { log } from "#log.js";

export default {
  Api() {
    log("Rendering: /docs/api/_notFound#Api");

    const location = useLocation();

    return <div>api: {location} is not found</div>;
  },
};
