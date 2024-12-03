import type { ReactNode, ReactElement } from "react";

import type { Match } from "#lib/match/match.js";
import { MatchIndexProvider } from "#lib/match/context.js";
import { useMatches, useMatchIndex } from "#lib/match/context.js";
import { useRootVoid } from "#lib/root/context.js";

export interface OutletProps {
  name?: string;
}

export function Outlet({ name }: OutletProps): ReactNode {
  const index = useMatchIndex();

  return index < 0 ? <RootOutlet name={name} /> : <LayoutOutlet name={name} />;
}

function RootOutlet({ name }: OutletProps): ReactNode {
  const matches = useMatches();
  const rootVoid = useRootVoid();

  const isExact = matches.at(-1)?.isExact;
  const lastVoid = matches.findLast((x) => x.route.elements._void);

  if (!isExact && !lastVoid && rootVoid) {
    return pick(rootVoid, name);
  }

  if (matches[0]) {
    return <Next index={0} match={matches[0]} name={name} />;
  }
}

function LayoutOutlet({ name }: OutletProps): ReactNode {
  const matches = useMatches();
  const index = useMatchIndex();

  const match = matches[index]!;
  const next = matches[index + 1];
  const last = matches.at(-1)!;

  // void?
  if (!last.isExact) {
    const lastVoid = matches.findLast((x) => x.route.elements._void);
    if (match === lastVoid) {
      return pick(match.route.elements._void, name);
    }
  }

  // content?
  if (match.isExact && match === last) {
    return pick(match.route.elements._content, name);
  }

  // next?
  if (next) {
    return <Next index={index + 1} match={next} name={name} />;
  }
}

interface NextProps {
  index: number;
  match: Match;
  name: string | undefined;
}

function Next({ index, match, name }: NextProps): ReactNode {
  const { _layout, _content } = match.route.elements;

  return (
    <MatchIndexProvider value={index}>
      {pick(_layout ?? _content, name)}
    </MatchIndexProvider>
  );
}

function pick(
  els: Record<string, ReactElement> | undefined,
  name?: string,
): ReactElement | undefined {
  if (els) {
    return name ? els[name] : Object.values(els)[0];
  }
}
