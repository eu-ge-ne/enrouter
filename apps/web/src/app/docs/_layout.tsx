import { Outlet, useLinkProps } from "enrouter";

import { createLog } from "#log.js";

const log = createLog("app/docs/_layout");

export const components = {
  main: Docs,
};

function Docs() {
  log("Rendering");

  return (
    <div className="flex divide-x p-4">
      <div className="flex w-[15rem] flex-col">
        <ul>
          <li>
            <a className="text-lg" {...useLinkProps("/docs")}>
              Docs
            </a>
          </li>
          <li>
            <a className="text-lg" {...useLinkProps("/docs/api")}>
              Api
            </a>
          </li>
        </ul>
      </div>
      <div>
        <Outlet name="docs" />
      </div>
    </div>
  );
}
