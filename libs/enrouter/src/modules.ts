/**
`RouteModules` is a collection of route module descriptors.
It maps ids of modules to their fs path and async import function.
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
