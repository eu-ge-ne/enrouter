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
      elements: { page, index, end },
    },
    isFull,
    next,
  } = match;

  if (here) {
    return name ? (page as CC)?.[name] : (page as C);
  }

  if (!isFull && !next) {
    return name ? (end as CC)?.[name] : (end as C);
  }

  if (!next) {
    return name ? (index as CC)?.[name] : (index as C);
  }

  const nextPage = next.route.elements.page;

  return (
    <MatchProvider value={next}>
      {name ? (nextPage as CC)?.[name] : (nextPage as C)}
    </MatchProvider>
  );
}
