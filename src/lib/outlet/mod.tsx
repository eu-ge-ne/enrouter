import type { ReactNode, ReactElement } from "react";

import { MatchProvider, useMatch } from "#lib/match/context.js";

export interface OutletProps {
  name?: string;
}

export function Outlet({ name }: OutletProps): ReactNode {
  const match = useMatch();
  if (!match) {
    return;
  }

  if (match === match.last && match.isExact) {
    return pick(match.route.elements._content, name);
  }

  if (match.next && match.last?.isExact) {
    const { _layout, _content } = match.next.route.elements;

    return (
      <MatchProvider value={match.next}>
        {pick(_layout ?? _content, name)}
      </MatchProvider>
    );
  }

  if (!match.last?.isExact && match.isVoid) {
    return pick(match.route.elements._void, name);
  }
}

function pick(
  els: Record<string, ReactElement> | undefined,
  name?: string
): ReactElement | undefined {
  if (els) {
    return name ? els[name] : Object.values(els)[0];
  }
}
