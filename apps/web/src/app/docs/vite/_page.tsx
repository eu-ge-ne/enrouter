import { Outlet } from "enrouter";

import { SecondaryLinkItem } from "#app/docs/links.js";

export default {
  Menu,
  Docs,
};

function Menu() {
  return (
    <div className="mt-4 border-t border-appBorder">
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
  return <Outlet name="Vite" />;
}
