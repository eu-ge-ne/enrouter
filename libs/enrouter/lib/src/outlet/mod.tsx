import type { ReactNode } from "react";

import { useMatch } from "#lib/match/context.js";
import { NotFound } from "./notFound.js";

export interface OutletProps {
  name: string;
}

export function Outlet({ name }: OutletProps): ReactNode {
  let match = useMatch();

  if (!match.next) {
    return match.elements?.index?.[name];
  }

  if (!match.next.route) {
    return match.elements?.notFound?.[name] ?? <NotFound />;
  }

  return match.next?.elements?.layout?.[name];
}
