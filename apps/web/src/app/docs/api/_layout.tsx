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
        <SecondaryLinkItem href="/docs/api/_layout">_layout</SecondaryLinkItem>
        <SecondaryLinkItem href="/docs/api/_content">
          _content
        </SecondaryLinkItem>
        <SecondaryLinkItem href="/docs/api/_void">_void</SecondaryLinkItem>
        <SecondaryLinkItem href="/docs/api/matchLocation">
          matchLocation
        </SecondaryLinkItem>
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
  return <Outlet />;
}
