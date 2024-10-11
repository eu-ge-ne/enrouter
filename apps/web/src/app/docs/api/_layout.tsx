import { Outlet } from "enrouter";

import { createLog } from "#log.js";
import { MenuSecondaryLink } from "#links.js";

const log = createLog("docs/api/_layout");

export const components = {
  menu: Menu,
  docs: Layout,
};

function Menu() {
  log("Rendering");

  return (
    <div className="mt-4 border-t border-paperBorder">
      <ul className="mt-4 flex flex-col gap-y-2">
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
        <li>
          <MenuSecondaryLink to="/docs/api/route">Route</MenuSecondaryLink>
        </li>
        {/* TODO */}
        <li>
          <MenuSecondaryLink to="/docs/api/handler">
            RouteHandler
          </MenuSecondaryLink>
        </li>
        <li>
          <MenuSecondaryLink to="/docs/api/match">RouteMatch</MenuSecondaryLink>
        </li>
        <li>
          <MenuSecondaryLink to="/docs/api/loaders">Loaders</MenuSecondaryLink>
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
          <MenuSecondaryLink to="/docs/api/outlet">Outlet</MenuSecondaryLink>
        </li>
        <li>
          <MenuSecondaryLink to="/docs/api/link">Link</MenuSecondaryLink>
        </li>
      </ul>
    </div>
  );
}

function Layout() {
  log("Rendering");

  return <Outlet name="api" />;
}
