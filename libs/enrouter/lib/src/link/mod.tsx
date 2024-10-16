import {
  useContext,
  useCallback,
  type MouseEvent,
  type AnchorHTMLAttributes,
} from "react";

import { logger } from "#lib/debug.js";
import { RouterContext } from "#lib/router/context.js";
import { usePath } from "#lib/hooks.js";

const log = logger("link");

function useOnClick(href: string) {
  const { navigate } = useContext(RouterContext);

  return useCallback(
    (e: MouseEvent) => {
      log("Clicked %s", href);
      e.preventDefault();
      navigate(href);
    },
    [href],
  );
}

export type LinkProps = Pick<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "onClick"
>;

export function useLinkProps(href: string): LinkProps {
  const onClick = useOnClick(href);

  return {
    href,
    onClick,
  };
}

export interface UseActiveLinkPropsParams {
  href: string;
  loose?: boolean;
  className: (isActive: boolean) => string;
}

export type ActiveLinkProps = Pick<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "className" | "href" | "onClick"
>;

export function useActiveLinkProps({
  href,
  loose,
  className,
}: UseActiveLinkPropsParams): ActiveLinkProps {
  const onClick = useOnClick(href);

  const match = usePath(href);
  let isActive = match !== undefined;
  if (isActive && !loose) {
    isActive = Boolean(match?.isFull);
  }

  return {
    className: className(isActive),
    href,
    onClick,
  };
}
