import { describe, test, expect } from "vitest";

import { buildRouteHandlers } from "./mod.js";

import type { Route } from "#routes/mod.js";

describe("buildRouteHandlers", () => {
  test("from 1 route", () => {
    const routes: Route = {
      path: "/",
      link: { css: [], mod: [] },
      mod: [],
    };

    expect(buildRouteHandlers({ routes })).toMatchSnapshot();
  });

  test("from 2 routes", () => {
    const routes: Route = {
      path: "/",
      link: { css: [], mod: [] },
      mod: [],
      tree: [
        {
          path: "/abc",
          link: { css: [], mod: [] },
          mod: [],
        },
      ],
    };

    expect(buildRouteHandlers({ routes })).toMatchSnapshot();
  });
});
