import { Outlet } from "enrouter";
import { MDXProvider } from "@mdx-js/react";

import { createLog } from "#log.js";
import { Mermaid } from "#mermaid.js";
import { MenuPrimaryLink, MenuSecondaryLink } from "#links.js";

const log = createLog("docs/_layout");

export const components = {
  main: Layout,
};

function Layout() {
  log("Rendering");

  return (
    <div className="flex divide-x divide-paperBorder p-4">
      <div className="flex w-[15rem] flex-col pr-4">
        <ul className="flex flex-col divide-y divide-paperBorder">
          <li className="flex flex-col gap-y-2 pb-4">
            <MenuPrimaryLink to="/docs">Docs</MenuPrimaryLink>
            <ul className="contents">
              <li>
                <MenuSecondaryLink to="/docs/start">
                  Getting Started
                </MenuSecondaryLink>
              </li>
              <li>
                <MenuSecondaryLink to="/docs/features">
                  Features
                </MenuSecondaryLink>
              </li>
              <li>
                <MenuSecondaryLink to="/docs/architecture">
                  Architecture
                </MenuSecondaryLink>
              </li>
            </ul>
          </li>
          <li className="pt-4">
            <MenuPrimaryLink to="/docs/api">API</MenuPrimaryLink>
          </li>
        </ul>
      </div>
      <div className="w-full p-4 pt-0">
        <MDXProvider
          components={{
            h3: ({ children }) => (
              <h3 className="pt-4 text-lg font-bold first:pt-0">
                {children as any}
              </h3>
            ),
            code: ({ children }) => (
              <div className="pt-4">
                <Mermaid>{children as any}</Mermaid>
              </div>
            ),
            p: ({ children }) => <p className="pt-4">{children as any}</p>,
            ul: ({ children }) => (
              <ul className="flex list-inside list-disc flex-col gap-y-2 pt-4">
                {children as any}
              </ul>
            ),
          }}
        >
          <Outlet name="docs" />
        </MDXProvider>
      </div>
    </div>
  );
}
