import type { ReactElement } from "react";

export interface Route {
  /**
   * Full path to url segment
   */
  path: string;

  /**
   * @see https://github.com/lukeed/regexparam
   */
  test: {
    keys: string[];
    pattern: RegExp;
  };

  modules: {
    id: string;
    fileName: string;
    importFn: () => Promise<unknown>;
  }[];

  loaded: boolean;

  elements: {
    _root?: ReactElement;
    __void?: ReactElement;
    _outlets?: ReactElement | Record<string, ReactElement>;
    _page?: ReactElement | Record<string, ReactElement>;
    _index?: ReactElement | Record<string, ReactElement>;
  };

  /**
   * Route tree
   */
  tree?: Route[];
}
