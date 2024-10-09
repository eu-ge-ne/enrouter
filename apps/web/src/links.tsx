import type { PropsWithChildren } from "react";

import { useLinkProps } from "enrouter";

export function MenuPrimaryLink({
  to,
  children,
}: PropsWithChildren<{ to: string }>) {
  return (
    <a className="font-semibold" {...useLinkProps(to)}>
      {children}
    </a>
  );
}

export function MenuSecondaryLink({
  to,
  children,
}: PropsWithChildren<{ to: string }>) {
  return (
    <a className="text-sm" {...useLinkProps(to)}>
      {children}
    </a>
  );
}
