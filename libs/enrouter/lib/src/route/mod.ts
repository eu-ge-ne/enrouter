import type { ReactElement } from "react";

/**
 * Base building block of routing.
 * Routes are orginized into a tree.
 * Every branch of the tree maps a segment of url to a code,
 * which will generate corresponding UI.
 */
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

  /**
   * Modules belonging to the route
   */
  modules: {
    id: string;
    fileName: string;
    importFn: () => Promise<unknown>;
  }[];

  loaded: boolean;

  elements: {
    _root?: ReactElement;
    __void?: ReactElement;
    _page?: ReactElement | Record<string, ReactElement>;
    _index?: ReactElement | Record<string, ReactElement>;
    _void?: ReactElement | Record<string, ReactElement>;
  };

  /**
   * Route tree
   */
  tree?: Route[];
}
