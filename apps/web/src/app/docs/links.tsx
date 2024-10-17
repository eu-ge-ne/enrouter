import type { PropsWithChildren } from "react";
import { useLink, useActive } from "enrouter";

export function PrimaryLinkItem({
  href,
  loose,
  children,
}: PropsWithChildren<{ href: string; loose?: boolean }>) {
  const liClassName = useActive({
    path: href,
    loose,
    value: ["border-r-4 border-black", ""],
  });

  const aClassName = useActive({
    path: href,
    loose,
    value: ["font-semibold", "tracking-tight"],
  });

  return (
    <li className={liClassName}>
      <a className={aClassName} {...useLink(href)}>
        {children}
      </a>
    </li>
  );
}
