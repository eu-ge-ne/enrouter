import type { PropsWithChildren } from "react";

import { useLink, useActive } from "enrouter";

export function MenuLink2({
  href,
  children,
}: PropsWithChildren<{ href: string }>) {
  const className = useActive({
    path: href,
    value: ["font-semibold text-sm", "text-sm"],
  });

  return (
    <a className={className} {...useLink(href)}>
      {children}
    </a>
  );
}
