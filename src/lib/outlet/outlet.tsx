import type { ReactNode, ReactElement } from "react";

import { MatchIndexProvider } from "#lib/match/context.js";
import { type MatchContext, useMatchContext } from "#lib/match/context.js";
import { useVoid } from "#lib/root/context.js";

export interface OutletProps {
  name?: string;
}

export function Outlet({ name }: OutletProps): ReactNode {
  const matchContext = useMatchContext();

  return matchContext.matchIndex < 0 ? (
    <RootOutlet matchContext={matchContext} name={name} />
  ) : (
    <LayoutOutlet matchContext={matchContext} name={name} />
  );
}

interface OutletImplProps {
  matchContext: MatchContext;
  name?: string;
}

function RootOutlet({
  matchContext: { matches, voidMatch, isExactMatch },
  name,
}: OutletImplProps): ReactNode {
  const voidComponents = useVoid();

  if (!isExactMatch && !voidMatch && voidComponents) {
    const Void = name
      ? voidComponents[name]!
      : Object.values(voidComponents)[0]!;

    return <Void />;
  }

  if (matches[0]) {
    const { _layout, _content } = matches[0].route!.elements;

    return (
      <MatchIndexProvider value={0}>
        {pick(_layout ?? _content, name)}
      </MatchIndexProvider>
    );
  }
}

function LayoutOutlet({
  matchContext: {
    matchIndex,
    match,
    nextMatch,
    lastMatch,
    voidMatch,
    isExactMatch,
  },
  name,
}: OutletImplProps): ReactNode {
  // void?
  if (!isExactMatch && match === voidMatch) {
    return pick(match?.route?.elements._void, name);
  }

  // content?
  if (isExactMatch && match === lastMatch) {
    return pick(match?.route?.elements._content, name);
  }

  // next?
  if (nextMatch) {
    const { _layout, _content } = nextMatch.route!.elements;

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
