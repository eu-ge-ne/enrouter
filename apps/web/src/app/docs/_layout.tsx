import { Outlet, useLinkProps } from "enrouter";
import { MDXProvider } from "@mdx-js/react";

import { createLog } from "#log.js";
import { Mermaid } from "#mermaid.js";

const log = createLog("app/docs/_layout");

export const components = {
  main: DocsLayout,
};

function DocsLayout() {
  log("Rendering");

  return (
    <div className="flex divide-x p-4">
      <div className="flex w-[15rem] flex-col">
        <ul>
          <li>
            <a className="text-lg" {...useLinkProps("/docs")}>
              Docs
            </a>
          </li>
          <li>
            <a className="text-lg" {...useLinkProps("/docs/api")}>
              Api
            </a>
          </li>
          <li>
            <a className="text-lg" {...useLinkProps("/docs/design")}>
              Design
            </a>
          </li>
        </ul>
      </div>
      <div className="w-full">
        <MDXProvider
          components={{
            h3: ({ children }) => (
              <h3 className="pt-4 text-lg font-bold">{children as any}</h3>
            ),
            code: ({ children }) => (
              <div className="pt-4">
                <Mermaid>{children as any}</Mermaid>
              </div>
            ),
            p: ({ children }) => <p className="pt-4">{children as any}</p>,
          }}
        >
          <Outlet name="docs" />
        </MDXProvider>
      </div>
    </div>
  );
}
