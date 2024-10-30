import type { PropsWithChildren } from "react";
import { Outlet, useLink } from "enrouter";

import { log } from "#log.js";
import { GitHub } from "#svg/github.js";

export default {
  Root,
};

function Root() {
  log("Rendering: /_layout");

  return (
    <div className="flex flex-col divide-y divide-appBorder">
      <div className="container mx-auto flex items-center justify-between p-4">
        <a className="text-2xl font-medium tracking-wider" {...useLink("/")}>
          enrouter
        </a>
        <ul className="flex justify-end gap-x-4">
          <li>
            <Link href="/docs">Docs</Link>
          </li>
          <li>
            <Link href="/docs/api">API</Link>
          </li>
          <li>
            <a href="https://github.com/eu-ge-ne/enrouter" target="_blank">
              <GitHub size="1.5rem" />
            </a>
          </li>
        </ul>
      </div>
      <div>
        <div className="container mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function Link({ href, children }: PropsWithChildren<{ href: string }>) {
  return (
    <a className="font-semibold" {...useLink(href)}>
      {children}
    </a>
  );
}
