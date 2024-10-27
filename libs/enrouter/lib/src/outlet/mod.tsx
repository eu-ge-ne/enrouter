import type { ReactNode, ReactElement } from "react";
import { isValidElement } from "react";

import type { Match } from "#lib/match/mod.js";
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
    const el = chooseElement(match.route.elements._page, name);
    return el ?? chooseVoid(match, name);
  }

  if (match.next) {
    const el = chooseElement(match.next.route.elements._page, name);
    return el ? (
      <MatchProvider value={match.next}>{el}</MatchProvider>
    ) : (
      chooseVoid(match.next, name)
    );
  }

  const el = chooseElement(match.route.elements._index, name);
  return el ?? chooseVoid(match, name);
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

function chooseVoid(
  match: Match | undefined,
  name?: string,
): ReactElement | undefined {
  if (!match) {
    return;
  }

  const el = chooseElement(match.route.elements._void, name);
  if (el) {
    return el;
  }

  return chooseVoid(match.prev);
}
