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

  if (root) {
    return pickElement(match.route.elements._page, name);
  }

  if (match.next) {
    return (
      <MatchProvider value={match.next}>
        {pickElement(match.next.route.elements._page, name)}
      </MatchProvider>
    );
  }

  if (match.full) {
    return pickElement(match.route.elements._index, name);
  }

  return pickElement(match.route.elements._void, name);
}

function pickElement(
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
