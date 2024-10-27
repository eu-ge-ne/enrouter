import type { Route } from "#lib/route/mod.js";

/**
 * Represents matched segment of location.
 */
export interface Match {
  route: Route;

  full: boolean;
  location: string;
  params: Record<string, string>;

  first?: Match;
  prev?: Match;
  next?: Match;
  last?: Match;
}
