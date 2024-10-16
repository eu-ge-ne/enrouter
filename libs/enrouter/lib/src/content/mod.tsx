import type { ReactElement } from "react";

import type { Match } from "#lib/match/mod.js";

export interface Content {
  match: Match;

  layout?: Record<string, ReactElement>;
  index?: Record<string, ReactElement>;

  prev?: Content;
  next?: Content;
  last?: Content;
}
