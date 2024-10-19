import { type MouseEvent, type AnchorHTMLAttributes, useCallback } from "react";

import { logger } from "#lib/debug.js";
import { useNavigate } from "#lib/router/navigate.js";

const log = logger("link");

export type LinkProps = Pick<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "onClick"
>;

export function useLink(href: string): LinkProps {
  const navigate = useNavigate();

  const onClick = useCallback(
    (e: MouseEvent) => {
      log("Clicked %s", href);
      e.preventDefault();
      navigate(href);
    },
    [href],
  );

  return { href, onClick };
}
