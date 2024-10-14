export type RouteModules = {
  id: string;
  fileName: string;
  importFn: () => Promise<unknown>;
  importStr: string;

  routeDir: string[];
  isRootRoute: boolean;
  routePath: string;
}[];

export function parseRoutePath(routeDir: string[]) {
  const str = "/" + routeDir.join("/");

  return str.replace(/\[(.+)\]/, ":$1");
}
