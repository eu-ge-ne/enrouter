import { type ReactNode, type ReactElement, useContext } from "react";

import { MatchIndexContext, MatchIndexProvider } from "#lib/match/context.js";
import { useMatch } from "#lib/match/useMatch.js";
import { useRootParams } from "#lib/root/context.js";

export interface OutletProps {
  name?: string;
}

export function Outlet({ name }: OutletProps): ReactNode {
  const index = useContext(MatchIndexContext);

  return index < 0 ? (
    <RootOutlet name={name} />
  ) : (
    <LayoutOutlet name={name} index={index} />
  );
}

function RootOutlet({ name }: { name?: string }): ReactNode {
  const root = useRootParams();
  const match = useMatch();

  if (!match.isExact && !match.fallback && root.fallback) {
    const Fallback = name
      ? root.fallback[name]!
      : Object.values(root.fallback)[0]!;

    return <Fallback />;
  }

  if (match.first?.route) {
    const { _layout, _content } = match.first.route.elements;

    return (
      <MatchIndexProvider value={0}>
        {pick(_layout ?? _content, name)}
      </MatchIndexProvider>
    );
  }
}

function LayoutOutlet({
  name,
  index,
}: {
  name?: string;
  index: number;
}): ReactNode {
  const { isExact, current, fallback, last, next } = useMatch();

  if (!isExact && current === fallback) {
    return pick(current?.route?.elements._fallback, name);
  }

  if (isExact && current === last) {
    return pick(current?.route?.elements._content, name);
  }

  if (next?.route) {
    const { _layout, _content } = next.route.elements;

    return (
      <MatchIndexProvider value={index + 1}>
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
