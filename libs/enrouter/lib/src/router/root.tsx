import type { ReactNode } from "react";

import { useMatch } from "#lib/match/context.js";

export function Root(): ReactNode {
  let match = useMatch()?.first;

  while (match) {
    if (match.isRoot) {
      return match.route.elements._root;
    }

    match = match.next;
  }
}
