import type { ReactNode } from "react";

import { useRoot } from "#lib/match/hooks.js";

export function Root(): ReactNode {
  const match = useRoot();

  return match?.route.elements._layout?.Root;
}
