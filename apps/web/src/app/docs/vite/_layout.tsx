import { Outlet } from "enrouter";

import { createLog } from "#log.js";
import { SecondaryLinkItem } from "#app/docs/links.js";

const log = createLog("docs/vite/_layout");

export default {
  Menu,
  Docs,
};

function Menu() {
  log("Rendering");

  return (
    <div className="mt-4 border-t border-paperBorder">
      <ul className="mt-4 flex flex-col gap-y-2">
        <SecondaryLinkItem href="/docs/vite/plugin">Plugin</SecondaryLinkItem>
        <SecondaryLinkItem href="/docs/vite/manifest">
          Manifest
        </SecondaryLinkItem>
      </ul>
    </div>
  );
}

function Docs() {
  log("Rendering");

  return <Outlet name="Vite" />;
}
