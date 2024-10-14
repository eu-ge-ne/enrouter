export type RouteModules = {
  dir: string[];
  isRoot: boolean;

  id: string;
  fileName: string;
  importFn: () => Promise<unknown>;
  importStr: string;
}[];
