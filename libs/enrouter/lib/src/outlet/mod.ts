import type { ReactNode } from "react";

import { useMatch } from "#lib/match/context.js";

export interface OutletProps {
  name: string;
}

export function Outlet({ name }: OutletProps): ReactNode {
  let match = useMatch();

  if (match.next?.elements?.layout?.[name]) {
    return match.next?.elements.layout?.[name];
  }

  return match.elements?.index?.[name];
}

/*
  if (!x.next) {
    return x.next;
  }

  while (x.next) {
    x = x.next;
    const outlets = x.layout || x.index;
    if (outlets) {
      return outlets;
    }
  }
  */
