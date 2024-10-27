import type { Route } from "#lib/route/mod.js";

/**
 * Represents matched segment of `URL`.
 */
export interface Match {
  route: Route;

  isFull: boolean;
  location: string;
  params: Record<string, string>;

  first?: Match;
  prev?: Match;
  next?: Match;
  last?: Match;
}
