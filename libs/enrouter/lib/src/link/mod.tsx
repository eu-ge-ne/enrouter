import { type MouseEvent, type AnchorHTMLAttributes, useCallback } from "react";

import { useNavigate } from "#lib/router/navigate.js";

export type LinkProps = Pick<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "onClick"
>;

export function useLink(href: string): LinkProps {
  const navigate = useNavigate();

  const onClick = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      navigate(href);
    },
    [href],
  );

  return { href, onClick };
}
