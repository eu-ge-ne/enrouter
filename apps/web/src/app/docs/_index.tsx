import { log } from "#log.js";
import Index from "./index.md";

export default {
  Docs() {
    log("Rendering: /docs/_index#Docs");

    return <Index />;
  },
};
