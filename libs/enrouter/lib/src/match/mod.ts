import type { ReactElement } from "react";

import type { Route } from "#lib/route/mod.js";

/**
 * Represents matched `Route` instance.
 */
export interface Match {
  route?: Route; // may be undefined in case of 404

  isFull: boolean;
  location: string;
  params: Record<string, string>;

  elements?: {
    layout?: Record<string, ReactElement>;
    index?: Record<string, ReactElement>;
    notFound?: Record<string, ReactElement>;
  };

  fist?: Match;
  next?: Match;
}
