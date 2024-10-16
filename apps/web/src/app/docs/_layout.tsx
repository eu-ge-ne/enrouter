import { Outlet } from "enrouter";

import { createLog } from "#log.js";
import { MenuLink1 } from "#links.js";
import { Mdx } from "#mdx.js";

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
          <li>
            <MenuLink1 href="/docs">Docs</MenuLink1>
          </li>
          <li>
            <MenuLink1 loose href="/docs/start">
              Getting Started
            </MenuLink1>
          </li>
          <li>
            <MenuLink1 loose href="/docs/features">
              Features
            </MenuLink1>
          </li>
          <li>
            <MenuLink1 loose href="/docs/arch">
              Architecture
            </MenuLink1>
          </li>
          <li>
            <MenuLink1 loose href="/docs/api">
              API
            </MenuLink1>
          </li>
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
