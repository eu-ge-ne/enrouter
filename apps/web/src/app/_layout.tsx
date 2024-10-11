import { Outlet, useLinkProps } from "enrouter";

import github_logo from "/github-light.svg";

import { createLog } from "#log.js";
import { MenuLink1 } from "#links.js";

const log = createLog("_layout");

export const components = {
  main: Layout,
};

function Layout() {
  log("Rendering");

  return (
    <div className="flex flex-col divide-y divide-paperBorder">
      <div className="container mx-auto flex items-center justify-between p-4">
        <a
          className="text-2xl font-medium tracking-wider"
          {...useLinkProps("/")}
        >
          enrouter
        </a>
        <ul className="flex justify-end gap-x-4">
          <li>
            <MenuLink1 to="/docs">Docs</MenuLink1>
          </li>
          <li>
            <MenuLink1 to="/docs/api">API</MenuLink1>
          </li>
          <li>
            <a href="https://github.com/eu-ge-ne/enrouter" target="_blank">
              <img
                src={github_logo}
                className="size-6"
                alt="https://github.com/eu-ge-ne/enrouter"
                width="24"
                height="24"
              />
            </a>
          </li>
        </ul>
      </div>
      <div>
        <div className="container mx-auto">
          <Outlet name="main" />
        </div>
      </div>
    </div>
  );
}
