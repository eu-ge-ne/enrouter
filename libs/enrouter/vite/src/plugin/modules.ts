import * as regexparam from "regexparam";
import groupBy from "lodash.groupby";

export type RouteModules = {
  routeDir: string[];
  routePath: string;
  routeTest: {
    keys: string[];
    pattern: RegExp;
  };

  routeModules: {
    id: string;
    fileName: string;
    importFn: () => Promise<unknown>;
    importStr: string;
  }[];
};

export function parseRoutePath(routeDir: string[]): {
  routePath: string;
  routeTest: { keys: string[]; pattern: RegExp };
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
}: BuildModuleTreeParams): RouteModules[] {
  const items = resolvedFiles.map((x) => {
    const routeDir = x.file
      .slice(routesPath.length + 1)
      .split("/")
      .slice(0, -1);
    const { routePath, routeTest } = parseRoutePath(routeDir);

    const module = {
      routeDir,
      routePath,
      routeTest,

      id: x.file.slice(rootPath.length + 1),
      fileName: x.file
        .slice(routesPath.length + 1)
        .split("/")
        .at(-1)!,
      importFn: () => import(x.resolvedId),
      importStr: `() => import("${x.resolvedId}")`,
    };

    return module;
  });

  const groups = Object.entries(groupBy(items, (x) => x.routePath));

  const routeModules = groups.map(([, items]) => {
    const { routeDir, routePath, routeTest } = items[0]!;

    const routeModules = items.map(({ id, fileName, importFn, importStr }) => ({
      id,
      fileName,
      importFn,
      importStr,
    }));

    return {
      routeDir,
      routePath,
      routeTest,

      routeModules,
    };
  });

  return routeModules.sort((a, b) => a.routeDir.length - b.routeDir.length);
}
