import type { Route } from "#lib/route/mod.js";

/**
 * Represents matched `Route`.
 */
export interface Match {
  route?: Route; // 404?

  isFull: boolean;
  location: string;
  params: Record<string, string>;

  fist?: Match;
  next?: Match;
}
