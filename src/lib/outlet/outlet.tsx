import type { ReactNode, ReactElement } from "react";

import { MatchIndexProvider } from "#lib/match/context.js";
import { type Matches, useMatches } from "#lib/match/useMatches.js";
import { useRootParams } from "#lib/root/context.js";

export interface OutletProps {
  name?: string;
}

export function Outlet({ name }: OutletProps): ReactNode {
  const matches = useMatches();

  return matches.matchIndex < 0 ? (
    <RootOutlet matches={matches} name={name} />
  ) : (
    <LayoutOutlet matches={matches} name={name} />
  );
}

interface OutletInnerProps {
  matches: Matches;
  name?: string;
}

function RootOutlet({
  matches: { firstMatch, voidMatch, isExactMatch },
  name,
}: OutletInnerProps): ReactNode {
  const rootParams = useRootParams();

  if (!isExactMatch && !voidMatch && rootParams.void) {
    const Void = name
      ? rootParams.void[name]!
      : Object.values(rootParams.void)[0]!;

    return <Void />;
  }

  if (firstMatch?.route) {
    const { _layout, _content } = firstMatch.route.elements;

    return (
      <MatchIndexProvider value={0}>
        {pick(_layout ?? _content, name)}
      </MatchIndexProvider>
    );
  }
}

function LayoutOutlet({
  matches: { matchIndex, match, nextMatch, lastMatch, voidMatch, isExactMatch },
  name,
}: OutletInnerProps): ReactNode {
  // void?
  if (!isExactMatch && match === voidMatch) {
    return pick(match?.route?.elements._void, name);
  }

  // content?
  if (isExactMatch && match === lastMatch) {
    return pick(match?.route?.elements._content, name);
  }

  // next?
  if (nextMatch?.route) {
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
