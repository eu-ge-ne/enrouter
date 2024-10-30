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
        <SecondaryLinkItem href="/docs/arch/routes">
          Building Routes
        </SecondaryLinkItem>
      </ul>
    </div>
  );
}

function Docs() {
  return <Outlet />;
}
