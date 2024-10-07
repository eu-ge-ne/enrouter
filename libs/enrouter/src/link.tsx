import { useContext } from "react";
import type { MouseEvent, AnchorHTMLAttributes } from "react";

import { createLog } from "#log.js";
import { RouterContext } from "./routers/context.js";

const log = createLog("link");

export function useLinkProps(
  href: string
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
