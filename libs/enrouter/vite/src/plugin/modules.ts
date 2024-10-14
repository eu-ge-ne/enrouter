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

interface BuildModuleTreeParams {
  rootPath: string;
  routesPath: string;
  resolvedFiles: { file: string; resolvedId: string }[];
}

export function buildModuleTree({
  rootPath,
  routesPath,
  resolvedFiles,
}: BuildModuleTreeParams): RouteModules {
  const routeModules: RouteModules = resolvedFiles
    .map((x) => {
      const routeDir = x.file
        .slice(routesPath.length + 1)
        .split("/")
        .slice(0, -1);

      const module = {
        id: x.file.slice(rootPath.length + 1),
        fileName: x.file
          .slice(routesPath.length + 1)
          .split("/")
          .at(-1)!,
        importFn: () => import(x.resolvedId),
        importStr: `() => import("${x.resolvedId}")`,

        routeDir,
        ...parseRoutePath(routeDir),
      };

      return module;
    })
    .sort((a, b) => a.routeDir.length - b.routeDir.length);

  return routeModules;
}
