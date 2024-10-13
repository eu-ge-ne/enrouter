import { describe, test, expect } from "vitest";

import { buildRouteHandlers } from "./mod.js";

import type { Route } from "#lib/route/mod.js";

describe("buildRouteHandlers", () => {
  test("from 1 route", () => {
    const route: Route = {
      path: "/",
      modules: [],
    };

    expect(buildRouteHandlers(route)).toMatchSnapshot();
  });

  test("from 2 routes", () => {
    const route: Route = {
      path: "/",
      modules: [],
      tree: [
        {
          path: "/abc",
          modules: [],
        },
      ],
    };

    expect(buildRouteHandlers(route)).toMatchSnapshot();
  });
});
