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
    _layout?: ReactElement | Record<string, ReactElement>;
    _content?: ReactElement | Record<string, ReactElement>;
    _void?: ReactElement | Record<string, ReactElement>;
  };

  /**
   * Route tree
   */
  tree?: Route[];
}
