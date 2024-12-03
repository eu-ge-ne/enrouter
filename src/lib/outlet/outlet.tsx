import type { ReactNode } from "react";

import { useMatches, useMatchIndex } from "#lib/match/context.js";
import { useRootVoid } from "#lib/root/context.js";
import { pick } from "./pick.js";
import { Next } from "./next.js";

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
