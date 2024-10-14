import * as regexparam from "regexparam";
import groupBy from "lodash.groupby";

export type RouteModules = {
  dir: string[];
  path: string;
  test: { keys: string[]; pattern: RegExp };
  modules: {
    id: string;
    fileName: string;
    importFn: () => Promise<unknown>;
    importStr: string;
  }[];
};

export function parseRoutePath(dir: string[]): {
  path: string;
  test: { keys: string[]; pattern: RegExp };
} {
  const str = "/" + dir.join("/");

  const path = str.replace(/\[(.+)\]/, ":$1");
  const test = regexparam.parse(path, true);

  return {
    path,
    test,
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
    const dir = x.file
      .slice(routesPath.length + 1)
      .split("/")
      .slice(0, -1);

    const { path, test } = parseRoutePath(dir);

    return {
      dir,
      path,
      test,

      id: x.file.slice(rootPath.length + 1),
      fileName: x.file
        .slice(routesPath.length + 1)
        .split("/")
        .at(-1)!,
      importFn: () => import(x.resolvedId),
      importStr: `() => import("${x.resolvedId}")`,
    };
  });

  const groups = Object.entries(groupBy(items, (x) => x.path));

  const routeModules = groups.map(([, items]) => {
    const { dir, path, test } = items[0]!;

    const modules = items.map(({ id, fileName, importFn, importStr }) => ({
      id,
      fileName,
      importFn,
      importStr,
    }));

    return {
      dir,
      path,
      test,
      modules,
    };
  });

  return routeModules;
}
