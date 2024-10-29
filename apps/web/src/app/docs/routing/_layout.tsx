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
        <Link href="/docs/routing/_layout">_layout.tsx</Link>
        <Link href="/docs/routing/_content">_content.tsx</Link>
        <Link href="/docs/routing/_void">_void.tsx</Link>
      </ul>
    </div>
  );
}
