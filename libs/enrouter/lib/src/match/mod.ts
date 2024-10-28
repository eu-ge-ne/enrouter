import type { Route } from "#lib/route/mod.js";

/**
 * Represents matched segment of location.
 */
export interface Match {
  isVoid: boolean;
  route: Route;

  isFull: boolean;
  location: string;
  params: Record<string, string>;

  first?: Match;
  prev?: Match;
  next?: Match;
  last?: Match;
}
