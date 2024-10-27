import type { ReactNode, ReactElement } from "react";
import { isValidElement } from "react";

import type { Match } from "#lib/match/mod.js";
import { MatchProvider, useMatch } from "#lib/match/context.js";

type C = ReactElement | undefined;

type CC = Record<string, ReactElement> | undefined;

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
    return chooseElement(match.route.elements._page, name);
  }

  if (match.next) {
    return (
      <MatchProvider value={match.next}>
        {chooseElement(match.next.route.elements._page)}
      </MatchProvider>
    );
  }

  if (match.full) {
    return chooseElement(match.route.elements._index, name);
  }

  return chooseElement(match.route.elements._void, name);
}

function chooseElement(
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
