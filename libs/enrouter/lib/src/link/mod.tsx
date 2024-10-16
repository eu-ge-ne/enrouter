import { type MouseEvent, type AnchorHTMLAttributes, useCallback } from "react";

import { logger } from "#lib/debug.js";
import { useRouter } from "#lib/router/context.js";

const log = logger("link");

export type LinkProps = Pick<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "onClick"
>;

export function useLink(href: string): LinkProps {
  const { navigate } = useRouter();

  const onClick = useCallback(
    (e: MouseEvent) => {
      log("Clicked %s", href);
      e.preventDefault();
      navigate(href);
    },
    [href],
  );

  return {
    href,
    onClick,
  };
}
