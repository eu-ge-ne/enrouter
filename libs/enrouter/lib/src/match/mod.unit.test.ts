import { describe, test, expect } from "vitest";
import * as regexparam from "regexparam";

import { matchRoutes } from "./mod.js";

import type { Route } from "#lib/route/mod.js";

describe("matchRoutes", () => {
  test("no matches", () => {
    const routes: Route = {
      path: "/abc",
      test: regexparam.parse("/abc", true),
      modules: [],
      loaded: false,
      elements: {},
    };

    expect(matchRoutes({ routes, location: "/x" })).toMatchSnapshot();
  });

  test("1 match", () => {
    const routes: Route = {
      path: "/",
      test: regexparam.parse("/", true),
      modules: [],
      loaded: false,
      elements: {},
    };

    expect(matchRoutes({ routes, location: "/" })).toMatchSnapshot();
  });

  test("2 matches", () => {
    const routes: Route = {
      path: "/",
      test: regexparam.parse("/", true),
      modules: [],
      loaded: false,
      elements: {},
      tree: [
        {
          path: "/abc",
          test: regexparam.parse("/abc", true),
          modules: [],
          loaded: false,
          elements: {},
        },
      ],
    };

    expect(matchRoutes({ routes, location: "/abc" })).toMatchSnapshot();
  });

  test("1 match with params", () => {
    const routes: Route = {
      path: "/[:id]",
      test: regexparam.parse("/:id", true),
      modules: [],
      loaded: false,
      elements: {},
    };

    expect(matchRoutes({ routes, location: "/100" })).toMatchSnapshot();
  });
});
