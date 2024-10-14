import * as regexparam from "regexparam";

export type RouteModules = {
  id: string;
  fileName: string;
  importFn: () => Promise<unknown>;
  importStr: string;

  routeDir: string[];
  routePath: string;
  routeTest: {
    keys: string[];
    pattern: RegExp;
  };
}[];

export function parseRoutePath(routeDir: string[]): {
  routePath: string;
  routeTest: {
    keys: string[];
    pattern: RegExp;
  };
} {
  const str = "/" + routeDir.join("/");

  const routePath = str.replace(/\[(.+)\]/, ":$1");
  const routeTest = regexparam.parse(routePath, true);

  return {
    routePath,
    routeTest,
  };
}
