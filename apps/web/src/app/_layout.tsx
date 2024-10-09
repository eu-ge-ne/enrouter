import { Outlet, useLinkProps } from "enrouter";

import npm_logo from "/npm.svg";
import github_logo from "/github-light.svg";

import { createLog } from "#log.js";

const log = createLog("app/_layout");

export const components = {
  main: AppLayout,
};

function AppLayout() {
  log("Rendering");

  return (
    <div className="flex flex-col divide-y divide-paperBorder">
      <div className="container mx-auto flex items-center justify-between p-4">
        <a className="text-lg" {...useLinkProps("/")}>
          enrouter
        </a>
        <div className="flex justify-end gap-x-4">
          <a className="text-lg" {...useLinkProps("/docs")}>
            Docs
          </a>
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
