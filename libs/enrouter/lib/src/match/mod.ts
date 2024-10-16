import type { Route } from "#lib/route/mod.js";

/**
 * Represents matched `Route` instance.
 */
export interface Match {
  route: Route;

  location: string;
  params: Record<string, string>;
  isFull: boolean;

  next?: Match;
  last?: Match;
}
