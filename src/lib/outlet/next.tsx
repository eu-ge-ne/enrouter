import type { ReactNode, ReactElement } from "react";

import type { Match } from "#lib/match/match.js";
import { MatchIndexProvider } from "#lib/match/context.js";
import { pick } from "./pick.js";

interface NextProps {
  index: number;
  match: Match;
  name: string | undefined;
}

export function Next({ index, match, name }: NextProps): ReactElement {
  const { _layout, _content } = match.route.elements;

  return (
    <MatchIndexProvider value={index}>
      {pick(_layout ?? _content, name)}
    </MatchIndexProvider>
  );
}
