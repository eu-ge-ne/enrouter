import mermaid from "mermaid";

import { log } from "#log.js";

mermaid.initialize({ startOnLoad: false, theme: "dark" });

export async function runMermaid(el: HTMLElement) {
  log("Rendering mermaid");

  await mermaid.run({ nodes: [el] });

  log("Mermaid rendering completed");
}
