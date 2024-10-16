import type { PropsWithChildren } from "react";

import { useLink, useActive } from "enrouter";

export function MenuLink1({
  href,
  loose,
  children,
}: PropsWithChildren<{ href: string; loose?: boolean }>) {
  const className = useActive({
    path: href,
    loose,
    value: ["font-semibold", "tracking-tight"],
  });

  return (
    <a className={className} {...useLink(href)}>
      {children}
    </a>
  );
}

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
