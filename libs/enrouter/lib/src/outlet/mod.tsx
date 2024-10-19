import type { ReactNode } from "react";

import { MatchProvider, useMatch } from "#lib/match/context.js";
import { NotFound } from "./notFound.js";

export interface OutletProps {
  name: string;
}

export function Outlet({ name }: OutletProps): ReactNode {
  const match = useMatch();

  if (!match.next) {
    return match.route?.elements?.index?.[name];
  }

  if (!match.next.route) {
    return match.route?.elements?.notFound?.[name] ?? <NotFound />;
  }

  return (
    <MatchProvider value={match.next}>
      {match.next?.route?.elements?.layout?.[name]}
    </MatchProvider>
  );
}
