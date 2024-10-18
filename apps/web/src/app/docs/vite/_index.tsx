import { log } from "#log.js";
import Index from "./index.md";

export default {
  Vite() {
    log("Rendering: /docs/vite/_index#Vite");

    return <Index />;
  },
};
