import type { Route } from "#lib/route/mod.js";

/**
 * Represents matched `Route`.
 */
export interface Match {
  route: Route;

  isFull: boolean;
  location: string;
  params: Record<string, string>;

  first?: Match;
  next?: Match;
}
