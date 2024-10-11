import type { PropsWithChildren } from "react";

import { useLinkProps } from "enrouter";

export function MenuLink1({ to, children }: PropsWithChildren<{ to: string }>) {
  return (
    <a className="font-semibold" {...useLinkProps(to)}>
      {children}
    </a>
  );
}

export function MenuLink2({ to, children }: PropsWithChildren<{ to: string }>) {
  return (
    <a className="text-sm" {...useLinkProps(to)}>
      {children}
    </a>
  );
}
