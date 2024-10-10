import { useContext } from "react";
import type { MouseEvent, AnchorHTMLAttributes } from "react";

import { logger } from "#debug.js";
import { RouterContext } from "./router/context.js";

const log = logger("link");

export function useLinkProps(
  href: string,
): Pick<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick"> {
  const { navigate } = useContext(RouterContext);

  function onClick(e: MouseEvent) {
    log("Clicked %s", href);
    e.preventDefault();
    navigate(href);
  }

  return {
    href,
    onClick,
  };
}
