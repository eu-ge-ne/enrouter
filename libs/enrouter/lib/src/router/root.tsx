import type { ReactNode } from "react";

import { useMatch } from "#lib/match/context.js";
import { NotFound } from "#lib/notFound.js";

export function Root(): ReactNode {
  const match = useMatch();

  return match?.route?.elements.this?.["Root"] ?? <NotFound />;
}
