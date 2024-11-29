import type { ReactNode, ReactElement } from "react";

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
  const match = matches[matchIndex];
  const nextMatch = matches[matchIndex + 1];
  const lastMatch = matches.at(-1);

  if (match) {
    // void?
    if (!lastMatch?.isExact) {
      const lastVoid = matches.findLast((x) => x.route.elements._void);
      if (match === lastVoid) {
        return pick(match.route.elements._void, name);
      }
    }

    // content?
    if (match.isExact && match === lastMatch) {
      return pick(match.route.elements._content, name);
    }
  }

  // next?
  if (nextMatch) {
    const { _layout, _content } = nextMatch.route.elements;

    return (
      <MatchIndexProvider value={matchIndex + 1}>
        {pick(_layout ?? _content, name)}
      </MatchIndexProvider>
    );
  }
}

function pick(
  els: Record<string, ReactElement> | undefined,
  name?: string,
): ReactElement | undefined {
  if (els) {
    return name ? els[name] : Object.values(els)[0];
  }
}
