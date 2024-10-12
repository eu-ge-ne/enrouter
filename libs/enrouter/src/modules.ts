/**
`RouteModules` is a collection of route module descriptors.
Maps module id to fs path and async import function.
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

export interface BuildFromViteGlobsParams {
  globs: Record<string, () => Promise<unknown>>;
  moduleId: (key: string) => string;
  path: (key: string) => string;
}

/**
 * Builds `RouteModules` from Vite glob import
 */
export function buildFromViteGlobs({
  globs,
  moduleId,
  path,
}: BuildFromViteGlobsParams): RouteModules {
  return Object.fromEntries(
    Object.entries(globs).map(([key, load]) => [
      moduleId(key),
      {
        path: path(key),
        load,
      },
    ]),
  );
}
