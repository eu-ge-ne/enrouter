import type { ReactNode, ReactElement } from "react";
import { isValidElement } from "react";

import { MatchProvider, useMatch } from "#lib/match/context.js";

export interface OutletProps {
  name?: string;
  root?: boolean;
}

export function Outlet({ name, root }: OutletProps): ReactNode {
  const match = useMatch();
  if (!match) {
    return;
  }

  const { _layout, _void, _index } = match.route.elements;

  if (root) {
    return pick(_layout, name);
  }

  if (match.isFull) {
    return pick(_index, name);
  }

  if (match.isVoid) {
    return pick(_void, name);
  }

  if (match.next) {
    return (
      <MatchProvider value={match.next}>
        {pick(match.next.route.elements._layout, name)}
      </MatchProvider>
    );
  }
}

function pick(
  els: ReactElement | Record<string, ReactElement> | undefined,
  name?: string,
): ReactElement | undefined {
  if (!name && isValidElement(els)) {
    return els;
  }

  if (name && els) {
    return (els as Record<string, ReactElement>)[name];
  }
}
