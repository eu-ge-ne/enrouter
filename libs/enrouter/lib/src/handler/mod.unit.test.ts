import { describe, test, expect } from "vitest";

import { buildRouteHandlers } from "./mod.js";

import type { Route } from "#lib/route/mod.js";

describe("buildRouteHandlers", () => {
  test("from 1 route", () => {
    const route: Route = {
      path: "/",
      mod: [],
    };

    expect(buildRouteHandlers(route)).toMatchSnapshot();
  });

  test("from 2 routes", () => {
    const route: Route = {
      path: "/",
      mod: [],
      tree: [
        {
          path: "/abc",
          mod: [],
        },
      ],
    };

    expect(buildRouteHandlers(route)).toMatchSnapshot();
  });
});
