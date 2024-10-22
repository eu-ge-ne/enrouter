import type { ReactNode, ReactElement } from "react";

import { MatchProvider, useMatch } from "#lib/match/context.js";

type C = ReactElement | undefined;

type CC = Record<string, ReactElement> | undefined;

export interface OutletProps {
  name?: string;
  here?: boolean;
}

export function Outlet({ name, here }: OutletProps): ReactNode {
  const match = useMatch();
  if (!match) {
    return;
  }

  const {
    route: {
      elements: { _page, _index, _void },
    },
    isFull,
    next,
  } = match;

  if (here) {
    return name ? (_page as CC)?.[name] : (_page as C);
  }

  if (!isFull && !next) {
    return name ? (_void as CC)?.[name] : (_void as C);
  }

  if (!next) {
    return name ? (_index as CC)?.[name] : (_index as C);
  }

  const _nextPage = next.route.elements._page;

  return (
    <MatchProvider value={next}>
      {name ? (_nextPage as CC)?.[name] : (_nextPage as C)}
    </MatchProvider>
  );
}
