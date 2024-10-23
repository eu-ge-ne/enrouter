import { describe, test, expect, vi } from "vitest";
import * as regexparam from "regexparam";

import { getRouteTree } from "#lib/route/tree.js";
import { createMatch } from "./create.js";

vi.mock(import("#lib/route/tree.js"), () => ({
  getRouteTree: vi.fn(),
}));

describe("match", () => {
  describe("create", () => {
    test("0 matches", async () => {
      vi.mocked(getRouteTree).mockReturnValueOnce({
        path: "/abc",
        test: regexparam.parse("/abc", true),
        modules: [],
        loaded: false,
        elements: {},
      });

      expect(await createMatch({ location: "/x" })).toMatchSnapshot();
    });

    test("from 1 route", async () => {
      vi.mocked(getRouteTree).mockReturnValueOnce({
        path: "/",
        test: regexparam.parse("/", true),
        modules: [],
        loaded: false,
        elements: {},
      });

      expect(await createMatch({ location: "/" })).toMatchSnapshot();
    });

    test('from 1 route with "_root"', async () => {
      vi.mocked(getRouteTree).mockReturnValueOnce({
        path: "/",
        test: regexparam.parse("/", true),
        modules: [],
        loaded: true,
        elements: {
          _root: <div>Root</div>,
        },
      });

      expect(await createMatch({ location: "/" })).toMatchSnapshot();
    });

    test("from 2 routes", async () => {
      vi.mocked(getRouteTree).mockReturnValueOnce({
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
      });

      expect(await createMatch({ location: "/abc" })).toMatchSnapshot();
    });

    test("from 1 route with params", async () => {
      vi.mocked(getRouteTree).mockReturnValueOnce({
        path: "/[:id]",
        test: regexparam.parse("/:id", true),
        modules: [],
        loaded: false,
        elements: {},
      });

      expect(await createMatch({ location: "/100" })).toMatchSnapshot();
    });

    test("from 2 routes with params", async () => {
      vi.mocked(getRouteTree).mockReturnValueOnce({
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
      });

      expect(await createMatch({ location: "/abc" })).toMatchSnapshot();
    });

    test('from 2 routes with "_root"', async () => {
      vi.mocked(getRouteTree).mockReturnValueOnce({
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
      });

      expect(await createMatch({ location: "/abc" })).toMatchSnapshot();
    });

    test('from 3 routes with "_void"', async () => {
      vi.mocked(getRouteTree).mockReturnValueOnce({
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
              _void: <div>Void</div>,
            },
            tree: [
              {
                path: "/abc/xyz",
                test: regexparam.parse("/abc/xyz", true),
                modules: [],
                loaded: true,
                elements: {},
              },
            ],
          },
        ],
      });

      expect(await createMatch({ location: "/abc/xyz/100" })).toMatchSnapshot();
    });

    test('from 3 routes with "__void"', async () => {
      vi.mocked(getRouteTree).mockReturnValueOnce({
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
              __void: <div>Void</div>,
            },
            tree: [
              {
                path: "/abc/xyz",
                test: regexparam.parse("/abc/xyz", true),
                modules: [],
                loaded: true,
                elements: {},
              },
            ],
          },
        ],
      });

      expect(await createMatch({ location: "/abc/xyz/100" })).toMatchSnapshot();
    });
  });
});
