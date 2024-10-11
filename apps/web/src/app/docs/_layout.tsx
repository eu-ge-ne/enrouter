import { Outlet } from "enrouter";

import { createLog } from "#log.js";
import { MenuPrimaryLink, MenuSecondaryLink } from "#links.js";
import { Mdx } from "#mdx.js";

const log = createLog("docs/_layout");

export const components = {
  main: Layout,
};

function Layout() {
  log("Rendering");

  return (
    <div className="flex divide-x divide-paperBorder p-4">
      <div className="flex w-[15rem] flex-col pr-4">
        <ul className="flex flex-col gap-y-2">
          <li>
            <MenuPrimaryLink to="/docs">Docs</MenuPrimaryLink>
          </li>
          <li>
            <MenuPrimaryLink to="/docs/start">Getting Started</MenuPrimaryLink>
          </li>
          <li>
            <MenuPrimaryLink to="/docs/features">Features</MenuPrimaryLink>
          </li>
          <li>
            <MenuPrimaryLink to="/docs/architecture">
              Architecture
            </MenuPrimaryLink>
          </li>
          <li>
            <MenuPrimaryLink to="/docs/api">API</MenuPrimaryLink>
          </li>
        </ul>
        <Outlet name="menu" />
      </div>
      <div className="w-full p-4 pt-0">
        <Mdx>
          <Outlet name="docs" />
        </Mdx>
      </div>
    </div>
  );
}
