import { Outlet } from "enrouter";

import { SecondaryLinkItem as Link } from "#app/docs/links.js";

export default {
  Menu,
  Docs: Outlet,
};

function Menu() {
  return (
    <div className="mt-4 border-t border-appBorder">
      <ul className="mt-4 flex flex-col gap-y-2">
        <Link href="/docs/api/_layout">_layout</Link>
        <Link href="/docs/api/_content">_content</Link>
        <Link href="/docs/api/_void">_void</Link>
        <Link href="/docs/api/matchLocation">matchLocation</Link>
        <Link href="/docs/api/match">Match</Link>
        <Link href="/docs/api/router/static">StaticRouter</Link>
        <Link href="/docs/api/router/browser">BrowserRouter</Link>
        <Link href="/docs/api/outlet">Outlet</Link>
        <Link href="/docs/api/link">Link</Link>
        <Link href="/docs/api/vite-plugin">Vite Plugin</Link>
        <Link href="/docs/api/vite-manifest">Vite Manifest</Link>
      </ul>
    </div>
  );
}
