import { useEffect, useRef } from "react";
import type { PropsWithChildren } from "react";
import { MDXProvider } from "@mdx-js/react";
import { useLocation } from "enrouter";

import "prism-themes/themes/prism-vsc-dark-plus.min.css";

import { createLog } from "#log.js";

const log = createLog("mdx");

export function Mdx({ children }: PropsWithChildren) {
  return (
    <MDXProvider
      components={{
        h1: ({ children }) => (
          <h1 className="pt-4 text-2xl font-semibold first:pt-0">
            {children as any}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="pt-4 text-xl font-semibold first:pt-0">
            {children as any}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="pt-4 text-lg font-semibold first:pt-0">
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

          return <Code className={className}>{children as any}</Code>;
        },
      }}
    >
      {children}
    </MDXProvider>
  );
}

export function Mermaid({ children }: PropsWithChildren) {
  const location = useLocation();

  if (!import.meta.env.SSR) {
    useEffect(() => {
      log("Rendering mermaid");

      import("mermaid").then(({ default: mermaid }) => {
        mermaid.initialize({ startOnLoad: false });
        // TODO: render only the div
        mermaid.run().then((x) => {
          log("Mermaid rendering completed");
        });
      });
    }, [location]);
  }

  return <div className="mermaid">{children}</div>;
}

export function Code({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  const location = useLocation();

  const div = useRef<HTMLDivElement>(null);

  if (!import.meta.env.SSR) {
    useEffect(() => {
      const el = div.current;
      if (el) {
        (async () => {
          log("Rendering %s", className);

          const prism = await import("prismjs");
          //@ts-ignore
          await import("prismjs/components/prism-typescript");

          prism.highlightElement(el, false, () =>
            log("%s rendering completed", className),
          );
        })();
      }
    }, [location, div]);
  }

  return (
    <div className={className} ref={div}>
      {children}
    </div>
  );
}
