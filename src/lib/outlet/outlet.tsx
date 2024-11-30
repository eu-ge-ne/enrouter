import type { ReactNode, ReactElement } from "react";

import type { Match } from "#lib/match/match.js";
import {
  MatchIndexProvider,
  useMatches,
  useMatchIndex,
} from "#lib/match/context.js";

export interface OutletProps {
  name?: string;
}

export function Outlet({ name }: OutletProps): ReactNode {
  const matches = useMatches();
  const matchIndex = useMatchIndex();

  // root?
  if (matchIndex < 0) {
    // void

    // next?
    if (matches[0]) {
      return <Next index={0} match={matches[0]} name={name} />;
    }

    return;
  }

  const match = matches[matchIndex]!;
  const nextMatch = matches[matchIndex + 1];
  const lastMatch = matches.at(-1)!;

  // void?
  if (!lastMatch.isExact) {
    const lastVoid = matches.findLast((x) => x.route.elements._void);
    if (match === lastVoid) {
      return pick(match.route.elements._void, name);
    }
  }

  // content?
  if (match.isExact && match === lastMatch) {
    return pick(match.route.elements._content, name);
  }

  // next?
  if (nextMatch) {
    return <Next index={matchIndex + 1} match={nextMatch} name={name} />;
  }
}

interface NextProps {
  index: number;
  match: Match;
  name: string | undefined;
}

function Next({ index, match, name }: NextProps): ReactElement {
  const { _layout, _content } = match.route.elements;

  return (
    <MatchIndexProvider value={index}>
      {pick(_layout ?? _content, name)}
    </MatchIndexProvider>
  );
}

function pick(
  els: Record<string, ReactElement> | undefined,
  name?: string
): ReactNode {
  if (els) {
    return name ? els[name] : Object.values(els)[0];
  }
}
