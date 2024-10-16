import { useEffect, useRef } from "react";
import type { PropsWithChildren } from "react";
import { MDXProvider } from "@mdx-js/react";
import { useLocation, useLink } from "enrouter";

import "prism-themes/themes/prism-vsc-dark-plus.min.css";

import { createLog } from "#log.js";

const log = createLog("mdx");

export function Mdx({ children }: PropsWithChildren) {
  return (
    <MDXProvider
      components={{
        h1: ({ children }) => (
          <h1 className="mt-8 text-2xl font-semibold first:mt-0">
            {children as any}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="mt-8 text-xl font-semibold first:mt-0">
            {children as any}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="mt-8 text-lg font-semibold first:mt-0">
            {children as any}
          </h3>
        ),
        a: ({ children, href }) => {
          if (href?.startsWith("/")) {
            return (
              <a className="underline" {...useLink(href)}>
                {children as any}
              </a>
            );
          } else {
            return (
              <a className="underline" href={href}>
                {children as any}
              </a>
            );
          }
        },
        p: ({ children }) => <p className="mt-8">{children as any}</p>,
        pre: ({ children }) => (
          <div className="mt-8">
            <pre>{children as any}</pre>
          </div>
        ),
        ul: ({ children }) => (
          <ul className="mt-8 flex list-inside list-disc flex-col gap-y-2">
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

export function Code({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  const location = useLocation();

  const div = useRef<HTMLDivElement>(null);

  if (!import.meta.env.SSR) {
    useEffect(() => {
      const el = div.current;
      if (!el) {
        return;
      }

      (async () => {
        log("Rendering %s", className);

        const prism = await import("prismjs");
        await Promise.all([
          //@ts-ignore
          import("prismjs/components/prism-typescript"),
          //@ts-ignore
          import("prismjs/components/prism-bash"),
        ]);

        prism.highlightElement(el, false, () =>
          log("%s rendering completed", className),
        );
      })();
    }, [location, div]);
  }

  return (
    <code className={className} ref={div}>
      {children}
    </code>
  );
}

export function Mermaid({ children }: PropsWithChildren) {
  const location = useLocation();

  const div = useRef<HTMLDivElement>(null);

  if (!import.meta.env.SSR) {
    useEffect(() => {
      const el = div.current;
      if (!el) {
        return;
      }

      (async () => {
        log("Rendering mermaid");

        const { default: mermaid } = await import("mermaid");

        mermaid.initialize({ startOnLoad: false });
        mermaid.run({ nodes: [el] });

        log("Mermaid rendering completed");
      })();
    }, [location, div]);
  }

  return (
    <code className="mermaid" ref={div}>
      {children}
    </code>
  );
}
