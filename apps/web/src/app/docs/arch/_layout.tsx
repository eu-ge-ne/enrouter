import { Outlet } from "enrouter";

import { createLog } from "#log.js";
import { SecondaryLinkItem } from "#app/docs/links.js";

const log = createLog("docs/arch/_layout");

export const components = {
  menu: Menu,
  docs: Layout,
};

function Menu() {
  log("Rendering");

  return (
    <div className="mt-4 border-t border-paperBorder">
      <ul className="mt-4 flex flex-col gap-y-2">
        <SecondaryLinkItem href="/docs/arch/routes">
          Building Routes
        </SecondaryLinkItem>
      </ul>
    </div>
  );
}

function Layout() {
  log("Rendering");

  return <Outlet name="arch" />;
}
