import { Outlet } from "enrouter";

import { createLog } from "#log.js";
import { SecondaryLinkItem } from "#app/docs/links.js";

const log = createLog("docs/api/_layout");

export default {
  Menu,
  Docs,
};

function Menu() {
  log("Rendering");

  return (
    <div className="mt-4 border-t border-paperBorder">
      <ul className="mt-4 flex flex-col gap-y-2">
        <SecondaryLinkItem href="/docs/api/route">Route</SecondaryLinkItem>
        <SecondaryLinkItem href="/docs/api/match">Match</SecondaryLinkItem>
        <SecondaryLinkItem href="/docs/api/router/static">
          StaticRouter
        </SecondaryLinkItem>
        <SecondaryLinkItem href="/docs/api/router/browser">
          BrowserRouter
        </SecondaryLinkItem>
        <SecondaryLinkItem href="/docs/api/outlet">Outlet</SecondaryLinkItem>
        <SecondaryLinkItem href="/docs/api/link">Link</SecondaryLinkItem>
      </ul>
    </div>
  );
}

function Docs() {
  log("Rendering");

  return <Outlet name="Api" />;
}
