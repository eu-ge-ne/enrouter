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
          <li className="flex flex-col gap-y-2 pt-4">
            <MenuPrimaryLink to="/docs/api">API</MenuPrimaryLink>
            <ul className="contents">
              <li>
                <MenuSecondaryLink to="/docs/api/route">
                  Route
                </MenuSecondaryLink>
              </li>
              <li>
                <MenuSecondaryLink to="/docs/api/handler">
                  RouteHandler
                </MenuSecondaryLink>
              </li>
              <li>
                <MenuSecondaryLink to="/docs/api/match">
                  RouteMatch
                </MenuSecondaryLink>
              </li>
              <li>
                <MenuSecondaryLink to="/docs/api/loaders">
                  Loaders
                </MenuSecondaryLink>
              </li>
              <li>
                <MenuSecondaryLink to="/docs/api/router/static">
                  StaticRouter
                </MenuSecondaryLink>
              </li>
              <li>
                <MenuSecondaryLink to="/docs/api/router/browser">
                  BrowserRouter
                </MenuSecondaryLink>
              </li>
              <li>
                <MenuSecondaryLink to="/docs/api/outlet">
                  Outlet
                </MenuSecondaryLink>
              </li>
              <li>
                <MenuSecondaryLink to="/docs/api/link">Link</MenuSecondaryLink>
              </li>
              <li>
                <MenuSecondaryLink to="/docs/api/modules">
                  RouteModules
                </MenuSecondaryLink>
              </li>
              <li>
                <MenuSecondaryLink to="/docs/api/assets">
                  ModuleAssets
                </MenuSecondaryLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="w-full p-4 pt-0">
        <Mdx>
          <Outlet name="docs" />
        </Mdx>
      </div>
    </div>
  );
}
