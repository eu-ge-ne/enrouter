import { describe, test, expect } from "vitest";
import * as regexparam from "regexparam";

import { matchRoutes } from "./mod.js";

import type { RouteHandler } from "#handler/mod.js";

describe("matchRoutes", () => {
  test("no matches", () => {
    const handlers: RouteHandler = {
      route: {
        path: "/abc",
        mod: [],
        link: [[], []],
      },
      test: regexparam.parse("/abc", true),
      modules: [],
    };

    expect(matchRoutes({ handlers, location: "/x" })).toMatchSnapshot();
  });

  test("1 match", () => {
    const handlers: RouteHandler = {
      route: {
        path: "/",
        mod: [],
        link: [[], []],
      },
      test: regexparam.parse("/", true),
      modules: [],
    };

    expect(matchRoutes({ handlers, location: "/" })).toMatchSnapshot();
  });

  test("2 matches", () => {
    const handlers: RouteHandler = {
      route: {
        path: "/",
        mod: [],
        link: [[], []],
      },
      test: regexparam.parse("/", true),
      modules: [],
      tree: [
        {
          route: {
            path: "/abc",
            mod: [],
            link: [[], []],
          },
          test: regexparam.parse("/abc", true),
          modules: [],
        },
      ],
    };

    expect(matchRoutes({ handlers, location: "/abc" })).toMatchSnapshot();
  });

  test("1 match with params", () => {
    const handlers: RouteHandler = {
      route: {
        path: "/[:id]",
        mod: [],
        link: [[], []],
      },
      test: regexparam.parse("/:id", true),
      modules: [],
    };

    expect(matchRoutes({ handlers, location: "/100" })).toMatchSnapshot();
  });
});
