import { Outlet } from "enrouter";

import { log } from "#log.js";
import { SecondaryLinkItem } from "#app/docs/links.js";

export default {
  Menu,
  Docs,
};

function Menu() {
  log("Rendering: /docs/vite/_layout#Menu");

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
  log("Rendering: /docs/vite/_layout#Docs");

  return <Outlet name="Vite" />;
}
