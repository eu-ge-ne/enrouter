import { describe, test, expect } from "vitest";

import { buildRouteHandlers } from "./mod.js";

import type { Route } from "#route/mod.js";

describe("buildRouteHandlers", () => {
  test("from 1 route", () => {
    const routes: Route = {
      path: "/",
      link: [[], []],
      mod: [],
    };

    expect(buildRouteHandlers({ routes })).toMatchSnapshot();
  });

  test("from 2 routes", () => {
    const routes: Route = {
      path: "/",
      link: [[], []],
      mod: [],
      tree: [
        {
          path: "/abc",
          link: [[], []],
          mod: [],
        },
      ],
    };

    expect(buildRouteHandlers({ routes })).toMatchSnapshot();
  });
});
