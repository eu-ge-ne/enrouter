import prism from "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-css";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-tsx";
import "prism-themes/themes/prism-vsc-dark-plus.min.css";

import { log } from "#log.js";

export function runPrism(el: HTMLElement, className?: string) {
  log("Rendering %s", className);

  prism.highlightElement(el, false, () =>
    log("%s rendering completed", className),
  );
}
