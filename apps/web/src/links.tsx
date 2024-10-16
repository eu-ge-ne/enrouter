import type { PropsWithChildren } from "react";

import { useActiveLinkProps } from "enrouter";

export function MenuLink1({
  href,
  loose,
  children,
}: PropsWithChildren<{ href: string; loose?: boolean }>) {
  const props = useActiveLinkProps({
    href,
    loose,
    className: (isActive) => (isActive ? "font-semibold" : "tracking-tight"),
  });

  return <a {...props}>{children}</a>;
}

export function MenuLink2({
  href,
  children,
}: PropsWithChildren<{ href: string }>) {
  const props = useActiveLinkProps({
    href,
    className: (isActive) => (isActive ? "font-semibold text-sm" : "text-sm"),
  });

  return <a {...props}>{children}</a>;
}
