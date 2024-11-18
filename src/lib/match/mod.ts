import type { Route } from "#lib/route/mod.js";

export interface Match {
  isVoid: boolean;
  route: Route;

  isExact: boolean;
  location: string;
  params: Record<string, string>;
}
