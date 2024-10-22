import { describe, test, expect } from "vitest";
import * as regexparam from "regexparam";

import type { Route } from "#lib/route/mod.js";
import { createMatch } from "./create.js";

describe("match", () => {
  describe("create", () => {
    test("0 matches", async () => {
      const routes: Route = {
        path: "/abc",
        test: regexparam.parse("/abc", true),
        modules: [],
        loaded: false,
        elements: {},
      };

      expect(await createMatch({ routes, location: "/x" })).toMatchSnapshot();
    });

    test("from 1 route", async () => {
      const routes: Route = {
        path: "/",
        test: regexparam.parse("/", true),
        modules: [],
        loaded: false,
        elements: {},
      };

      expect(await createMatch({ routes, location: "/" })).toMatchSnapshot();
    });

    test('from 1 route with "_root"', async () => {
      const routes: Route = {
        path: "/",
        test: regexparam.parse("/", true),
        modules: [],
        loaded: true,
        elements: {
          _root: <div>Root</div>,
        },
      };

      expect(await createMatch({ routes, location: "/" })).toMatchSnapshot();
    });

    test("2 matches", async () => {
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

      expect(await createMatch({ routes, location: "/abc" })).toMatchSnapshot();
    });

    test("from 1 route with params", async () => {
      const routes: Route = {
        path: "/[:id]",
        test: regexparam.parse("/:id", true),
        modules: [],
        loaded: false,
        elements: {},
      };

      expect(await createMatch({ routes, location: "/100" })).toMatchSnapshot();
    });

    test("from 1 route and 1 route with params", async () => {
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

      expect(await createMatch({ routes, location: "/abc" })).toMatchSnapshot();
    });

    test('from 1 route and 1 route with "_root"', async () => {
      const routes: Route = {
        path: "/",
        test: regexparam.parse("/", true),
        modules: [],
        loaded: true,
        elements: {},
        tree: [
          {
            path: "/abc",
            test: regexparam.parse("/abc", true),
            modules: [],
            loaded: true,
            elements: {
              _root: <div>Root</div>,
            },
          },
        ],
      };

      expect(await createMatch({ routes, location: "/abc" })).toMatchSnapshot();
    });
  });
});
