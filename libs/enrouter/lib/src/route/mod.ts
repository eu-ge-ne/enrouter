import type { ReactElement } from "react";

export interface Route {
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
    _layout?: Record<string, ReactElement>;
    _content?: Record<string, ReactElement>;
    _void?: Record<string, ReactElement>;
  };

  tree?: Route[];
}
