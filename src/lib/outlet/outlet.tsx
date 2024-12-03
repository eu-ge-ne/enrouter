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
  const index = useMatchIndex();

  return index < 0
    ? rootOutlet(name, matches)
    : layoutOutlet(name, matches, index);
}

function rootOutlet(name: string | undefined, matches: Match[]): ReactNode {
  if (!matches.at(-1)?.isExact) {
    const lastVoid = matches.findLast((x) => x.route.elements._void);
    if (!lastVoid) {
      return;
    }
  }

  return <Next index={0} match={matches[0]!} name={name} />;
}

function layoutOutlet(
  name: string | undefined,
  matches: Match[],
  index: number,
): ReactNode {
  const match = matches[index]!;
  const nextMatch = matches[index + 1];
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
    return <Next index={index + 1} match={nextMatch} name={name} />;
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
  name?: string,
): ReactNode {
  if (els) {
    return name ? els[name] : Object.values(els)[0];
  }
}
