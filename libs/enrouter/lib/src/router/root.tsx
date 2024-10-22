import type { ReactNode } from "react";

import { useMatch } from "#lib/match/context.js";

export function Root(): ReactNode {
  const match = useMatch();

  if (match?.last == match && !match?.isFull) {
    return match?.route.elements.__void;
  }

  return match?.route.elements._root;
}
