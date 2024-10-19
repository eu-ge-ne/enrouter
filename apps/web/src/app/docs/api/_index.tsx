import { log } from "#log.js";
import Index from "./index.md";

export default {
  Api() {
    log("Rendering: /docs/api/_index#Api");

    return <Index />;
  },
};
