import { Outlet } from "enrouter";

import { Mdx } from "#mdx/mod.js";
import { PrimaryLinkItem as Link } from "./links.js";

export default {
  Layout,
};

function Layout() {
  return (
    <div className="flex flex-col divide-appBorder p-4 max-sm:divide-y md:flex-row md:divide-x">
      <div className="flex flex-col max-sm:pb-4 md:w-[15rem] md:pr-4">
        <ul className="flex flex-col gap-y-2">
          <Link href="/docs">Docs</Link>
          <Link loose href="/docs/start">
            Getting Started
          </Link>
          <Link loose href="/docs/routing">
            Routing
          </Link>
          <Link loose href="/docs/api">
            API
          </Link>
        </ul>
        <Outlet name="Menu" />
      </div>
      <div className="max-sm:pt-4 md:w-[45rem] md:pl-4">
        <Mdx>
          <Outlet name="Docs" />
        </Mdx>
      </div>
    </div>
  );
}
