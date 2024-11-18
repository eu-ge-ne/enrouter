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
  const curr = matches[matchIndex];
  const next = matches[matchIndex + 1];
  const last = matches.at(-1);

  if (curr) {
    if (curr === last && curr.isExact) {
      return pick(curr.route.elements._content, name);
    }

    if (!last?.isExact && curr.isVoid) {
      return pick(curr.route.elements._void, name);
    }
  }

  if (next) {
    const { _layout, _content } = next.route.elements;

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
