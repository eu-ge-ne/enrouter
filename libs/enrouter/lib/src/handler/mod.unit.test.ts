import { describe, test, expect } from "vitest";
import * as regexparam from "regexparam";

import { buildRouteHandlers } from "./mod.js";

import type { Route } from "#lib/route/mod.js";

describe("buildRouteHandlers", () => {
  test("from 1 route", () => {
    const route: Route = {
      path: "/",
      test: regexparam.parse("/", true),
      modules: [],
    };

    expect(buildRouteHandlers(route)).toMatchSnapshot();
  });

  test("from 2 routes", () => {
    const route: Route = {
      path: "/",
      test: regexparam.parse("/", true),
      modules: [],
      tree: [
        {
          path: "/abc",
          test: regexparam.parse("/abc", true),
          modules: [],
        },
      ],
    };

    expect(buildRouteHandlers(route)).toMatchSnapshot();
  });
});
