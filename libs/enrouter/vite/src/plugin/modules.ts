export type RouteModules = {
  dir: string[];

  id: string;
  fileName: string;
  importFn: () => Promise<unknown>;
  importStr: string;
}[];
