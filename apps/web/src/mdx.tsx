import { useEffect } from "react";
import type { PropsWithChildren } from "react";
import { MDXProvider } from "@mdx-js/react";
import { useLocation } from "enrouter";

import { createLog } from "#log.js";

const log = createLog("mdx");

export function Mdx({ children }: PropsWithChildren) {
  log("Rendering");

  return (
    <MDXProvider
      components={{
        h3: ({ children }) => (
          <h3 className="pt-4 text-lg font-bold first:pt-0">
            {children as any}
          </h3>
        ),
        p: ({ children }) => <p className="pt-4">{children as any}</p>,
        pre: ({ children }) => <pre className="pt-4">{children as any}</pre>,
        ul: ({ children }) => (
          <ul className="flex list-inside list-disc flex-col gap-y-2 pt-4">
            {children as any}
          </ul>
        ),
        code: ({ className, children }) => {
          if (className?.includes("language-mermaid")) {
            return <Mermaid>{children as any}</Mermaid>;
          }

          return <code className={className}>{children as any}</code>;
        },
      }}
    >
      {children}
    </MDXProvider>
  );
}

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
