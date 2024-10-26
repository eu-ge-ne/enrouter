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
    value: ["border-r-4 border-appMenuHighlight", ""],
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

export function SecondaryLinkItem({
  href,
  children,
}: PropsWithChildren<{ href: string }>) {
  const liClassName = useActive({
    path: href,
    value: ["border-r-2 border-appMenuHighlight", ""],
  });

  const aClassName = useActive({
    path: href,
    value: ["font-semibold text-sm", "text-sm"],
  });

  return (
    <li className={liClassName}>
      <a className={aClassName} {...useLink(href)}>
        {children}
      </a>
    </li>
  );
}
