import type { ReactNode } from "react";

import { useMatch } from "#lib/match/context.js";

export function Root(): ReactNode {
  const match = useMatch();

  return match?.route.elements._root;
}
