import { Outlet } from "enrouter";

import { createLog } from "#log.js";
import { MenuLink2 } from "#links.js";

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
          <MenuLink2 to="/docs/api/modules">RouteModules</MenuLink2>
        </li>
        <li>
          <MenuLink2 to="/docs/api/route">Route</MenuLink2>
        </li>
        <li>
          <MenuLink2 to="/docs/api/handler">RouteHandler</MenuLink2>
        </li>
        <li>
          <MenuLink2 to="/docs/api/match">RouteMatch</MenuLink2>
        </li>

        {/* TODO */}
        <li>
          <MenuLink2 to="/docs/api/loaders">Loaders</MenuLink2>
        </li>
        <li>
          <MenuLink2 to="/docs/api/router/static">StaticRouter</MenuLink2>
        </li>
        <li>
          <MenuLink2 to="/docs/api/router/browser">BrowserRouter</MenuLink2>
        </li>
        <li>
          <MenuLink2 to="/docs/api/outlet">Outlet</MenuLink2>
        </li>
        <li>
          <MenuLink2 to="/docs/api/link">Link</MenuLink2>
        </li>
      </ul>
    </div>
  );
}

function Layout() {
  log("Rendering");

  return <Outlet name="api" />;
}
