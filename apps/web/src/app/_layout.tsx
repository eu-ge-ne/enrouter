import type { PropsWithChildren } from "react";
import { Outlet, useLink } from "enrouter";

import { createLog } from "#log.js";
import github_logo from "/github-light.svg";

const log = createLog("_layout");

export default {
  Root() {
    log("Rendering");

    return (
      <div className="flex flex-col divide-y divide-paperBorder">
        <div className="container mx-auto flex items-center justify-between p-4">
          <a className="text-2xl font-medium tracking-wider" {...useLink("/")}>
            enrouter
          </a>
          <ul className="flex justify-end gap-x-4">
            <li>
              <Link href="/abc">Abc</Link>
            </li>
            <li>
              <Link href="/docs">Docs</Link>
            </li>
            <li>
              <Link href="/docs/api">API</Link>
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
            <Outlet name="Main" />
          </div>
        </div>
      </div>
    );
  },
};

function Link({ href, children }: PropsWithChildren<{ href: string }>) {
  return (
    <a className="font-semibold" {...useLink(href)}>
      {children}
    </a>
  );
}
