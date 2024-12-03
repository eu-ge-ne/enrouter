import type { ReactNode, ReactElement } from "react";

import type { Match } from "#lib/match/match.js";
import { useMatches, useMatchIndex } from "#lib/match/context.js";
import { useRootVoid } from "#lib/root/context.js";
import { Next } from "./next.js";
import { pick } from "./pick.js";

export interface OutletProps {
  name?: string;
}

export function Outlet({ name }: OutletProps): ReactNode {
  const matches = useMatches();
  const index = useMatchIndex();
  const rootVoid = useRootVoid();

  return index < 0
    ? rootOutlet(name, matches, rootVoid)
    : layoutOutlet(name, matches, index);
}

function rootOutlet(
  name: string | undefined,
  matches: Match[],
  rootVoid: Record<string, ReactElement> | undefined,
): ReactNode {
  if (!matches.at(-1)?.isExact) {
    const lastVoid = matches.findLast((x) => x.route.elements._void);
    if (!lastVoid) {
      if (rootVoid) {
        // TODO: render root void
        return pick(rootVoid, name);
      }

      return;
    }
  }

  return <Next index={0} match={matches[0]!} name={name} />;
}

function layoutOutlet(
  name: string | undefined,
  matches: Match[],
  index: number,
): ReactNode {
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
