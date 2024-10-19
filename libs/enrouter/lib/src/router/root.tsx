import type { ReactNode } from "react";

import { useMatch } from "#lib/match/context.js";
import { NotFound } from "#lib/outlet/notFound.js";

export function Root(): ReactNode {
  const match = useMatch();

  return match.route?.elements.layout?.["Root"] ?? <NotFound />;
}
