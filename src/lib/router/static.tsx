import type { ReactNode, ReactElement } from "react";

import type { Match } from "#lib/match/match.js";
import { noNavigate } from "#lib/navigate/mod.js";
import { Root } from "./root.js";

export interface StaticRouterProps {
  root?: ReactElement;
  location: string;
  matches: Match[];
}

export function StaticRouter(props: StaticRouterProps): ReactNode {
  return <Root {...props} navigate={noNavigate} />;
}
