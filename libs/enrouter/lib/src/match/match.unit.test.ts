import { describe, test, expect } from "vitest";
import * as regexparam from "regexparam";

import type { Route } from "#lib/route/mod.js";
import { match } from "./match.js";

describe("match", () => {
  describe("match", () => {
    test("0 matches", () => {
      const routes: Route = {
        path: "/abc",
        test: regexparam.parse("/abc", true),
        modules: [],
        loaded: false,
        elements: {},
      };

      expect(match({ routes, location: "/x" })).toMatchSnapshot();
    });

    test("1 match", () => {
      const routes: Route = {
        path: "/",
        test: regexparam.parse("/", true),
        modules: [],
        loaded: false,
        elements: {},
      };

      expect(match({ routes, location: "/" })).toMatchSnapshot();
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

      expect(match({ routes, location: "/abc" })).toMatchSnapshot();
    });

    test("1 match with params", () => {
      const routes: Route = {
        path: "/[:id]",
        test: regexparam.parse("/:id", true),
        modules: [],
        loaded: false,
        elements: {},
      };

      expect(match({ routes, location: "/100" })).toMatchSnapshot();
    });

    test("1 match and 1 match with params", () => {
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
          {
            path: "/[:id]",
            test: regexparam.parse("/:id", true),
            modules: [],
            loaded: false,
            elements: {},
          },
        ],
      };

      expect(match({ routes, location: "/abc" })).toMatchSnapshot();
    });
  });
});
