/**
RouteModules
 */
export type RouteModules = Record<
  string,
  {
    path: string;
    load: () => Promise<unknown>;
  }
>;
