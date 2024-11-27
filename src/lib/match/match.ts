import type { Route } from "#lib/route/mod.js";

export interface Match {
  route: Route;
  isExact: boolean;
  location: string;
  params: Record<string, string>;
}
