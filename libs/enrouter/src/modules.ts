import { logger } from "#debug.js";

const log = logger("modules");

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

export interface BuildRouteModulesFromViteGlobsParams {
  globs: Record<string, () => Promise<unknown>>;
  moduleId: (key: string) => string;
  path: (key: string) => string;
}

/**
 * Builds `RouteModules` from Vite glob import
 */
export function buildRouteModulesFromViteGlobs({
  globs,
  moduleId,
  path,
}: BuildRouteModulesFromViteGlobsParams): RouteModules {
  log("Building modules");

  const modules = Object.fromEntries(
    Object.entries(globs).map(([key, load]) => [
      moduleId(key),
      {
        path: path(key),
        load,
      },
    ]),
  );

  log("Modules built: %o", modules);

  return modules;
}
