import type { PropsWithChildren } from "react";

import { useActiveLinkProps } from "enrouter";

export function MenuLink1({ to, children }: PropsWithChildren<{ to: string }>) {
  const props = useActiveLinkProps({
    href: to,
    className: (isActive) =>
      isActive ? "text-blue-600 font-semibold" : "font-semibold",
  });

  return <a {...props}>{children}</a>;
}

export function MenuLink2({ to, children }: PropsWithChildren<{ to: string }>) {
  const props = useActiveLinkProps({
    href: to,
    className: (isActive) => (isActive ? "text-blue-600 text-sm" : "text-sm"),
  });

  return <a {...props}>{children}</a>;
}
