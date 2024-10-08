import { useEffect } from "react";
import type { PropsWithChildren } from "react";

import { useLocation } from "enrouter";

import { createLog } from "#log.js";

const log = createLog("mermaid");

export function Mermaid({ children }: PropsWithChildren) {
  const location = useLocation();

  useEffect(() => {
    if (!import.meta.env.SSR) {
      log("Starting rendering");
      import("mermaid").then(({ default: mermaid }) => {
        mermaid.initialize({ startOnLoad: false });
        mermaid.run();
        log("Rendering started");
      });
    }
  }, [location]);

  return <div className="mermaid">{children}</div>;
}
