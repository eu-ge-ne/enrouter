/**
 * Collection of route module descriptors.
 * Maps module id to fs path and async import function.
 */
export type RouteModules = Record<
  string,
  {
    /**
     * FS path of module
     */
    path: string;
    /**
     * Async module import function
     */
    load: () => Promise<unknown>;
  }
>;
