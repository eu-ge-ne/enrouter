import { Outlet, useLinkProps } from "enrouter";

import npm_logo from "/npm.svg";
import github_logo from "/github-light.svg";

import { createLog } from "#log.js";
import { MenuPrimaryLink } from "#links.js";

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
        <div className="flex justify-end gap-x-4">
          <MenuPrimaryLink to="/docs">Docs</MenuPrimaryLink>
          <MenuPrimaryLink to="/docs/api">API</MenuPrimaryLink>
          <a href="https://www.npmjs.com/package/enrouter" target="_blank">
            <img
              src={npm_logo}
              className="size-6"
              alt="https://www.npmjs.com/package/enrouter"
            />
          </a>
          <a href="https://github.com/eu-ge-ne/enrouter" target="_blank">
            <img
              src={github_logo}
              className="size-6"
              alt="https://github.com/eu-ge-ne/enrouter"
            />
          </a>
        </div>
      </div>
      <div>
        <div className="container mx-auto">
          <Outlet name="main" />
        </div>
      </div>
    </div>
  );
}
