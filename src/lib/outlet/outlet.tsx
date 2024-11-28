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
  const voidIndex = matches.findLastIndex((x) => x.route.elements._void);

  if (match && !lastMatch?.isExact && matchIndex === voidIndex) {
    return pick(match.route.elements._void, name);
  }

  if (match && match.isExact && match === lastMatch) {
    return pick(match.route.elements._content, name);
  }

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
