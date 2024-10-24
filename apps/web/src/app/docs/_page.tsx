import { Outlet } from "enrouter";

import { Mdx } from "#mdx.js";
import { PrimaryLinkItem } from "./links.js";

export default function Page() {
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
        <Outlet name="Menu" />
      </div>
      <div className="w-full p-8 pr-0 pt-0">
        <Mdx>
          <Outlet name="Docs" />
        </Mdx>
      </div>
    </div>
  );
}
