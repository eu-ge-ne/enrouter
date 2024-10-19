import type { Match } from "./mod.js";
import { loadRoutes } from "#lib/route/load.js";

export function load(matches: Match[]): Promise<void> {
  return loadRoutes(matches.map((x) => x.route).filter((x) => x !== undefined));
}
