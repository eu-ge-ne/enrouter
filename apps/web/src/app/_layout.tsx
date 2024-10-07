import { Outlet } from "enrouter";

import npm_logo from "/npm.svg";
import github_logo from "/github-light.svg";

import { createLog } from "#log.js";

const log = createLog("app/_layout");

export const components = {
  main: App,
};

function App() {
  log("Rendering");

  return (
    <div className="flex flex-col divide-y">
      <div className="p-4 items-center justify-between flex">
        <span className="text-lg tracking-tighter font-medium font-mono">
          enrouter
        </span>
        <div className="flex justify-end gap-x-4">
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
      <Outlet name="main" />
    </div>
  );
}
