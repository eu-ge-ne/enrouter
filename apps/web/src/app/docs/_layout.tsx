import { Outlet } from "enrouter";

import { createLog } from "#log.js";
import { Mdx } from "#mdx.js";
import { PrimaryLinkItem } from "./links.js";

const log = createLog("docs/_layout");

export const components = {
  main: Layout,
};

function Layout() {
  log("Rendering");

  return (
    <div className="flex divide-x divide-paperBorder p-4 pt-8">
      <div className="flex w-[15rem] flex-col pr-4">
        <ul className="flex flex-col gap-y-2">
          <PrimaryLinkItem href="/docs">Docs</PrimaryLinkItem>
          <PrimaryLinkItem loose href="/docs/start">
            Getting Started
          </PrimaryLinkItem>
          <PrimaryLinkItem loose href="/docs/features">
            Features
          </PrimaryLinkItem>
          <PrimaryLinkItem loose href="/docs/arch">
            Architecture
          </PrimaryLinkItem>
          <PrimaryLinkItem loose href="/docs/api">
            API
          </PrimaryLinkItem>
          <PrimaryLinkItem loose href="/docs/vite">
            Vite
          </PrimaryLinkItem>
        </ul>
        <Outlet name="menu" />
      </div>
      <div className="w-full p-8 pr-0 pt-0">
        <Mdx>
          <Outlet name="docs" />
        </Mdx>
      </div>
    </div>
  );
}
