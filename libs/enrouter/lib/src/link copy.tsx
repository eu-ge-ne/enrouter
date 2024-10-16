import { useContext, type MouseEvent, type AnchorHTMLAttributes } from "react";

import { logger } from "./debug.js";
import { RouterContext } from "./router/context.js";
import { usePath } from "./hooks.js";

const log = logger("link");

type LinkClassName = string | ((isActive: boolean) => string);

export type LinkProps = Pick<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "className" | "href" | "onClick"
>;

export function useLinkProps(
  href: string,
  className?: LinkClassName,
): LinkProps {
  const { navigate } = useContext(RouterContext);
  const match = usePath(href);

  log("href: %s; match: %o", href, match);

  function onClick(e: MouseEvent) {
    log("Clicked %s", href);
    e.preventDefault();
    navigate(href);
  }

  let cn: string | undefined;

  if (typeof className === "string") {
    cn = className;
  }

  if (typeof className === "function") {
    const isActive = match !== undefined;
    cn = className(isActive);
  }

  return {
    href,
    onClick,
    className: cn,
  };
}
