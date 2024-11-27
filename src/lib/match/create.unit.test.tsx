import { describe, test, expect, vi } from "vitest";
import * as regexparam from "regexparam";

import { getRouteTree } from "#lib/route/tree.js";
import { matchLocation } from "./create.js";

vi.mock(import("#lib/route/tree.js"), () => ({
  getRouteTree: vi.fn(),
}));

describe("match", () => {
  describe("matchLocation", () => {
    test("0 matches", async () => {
      vi.mocked(getRouteTree).mockReturnValueOnce({
        path: "/abc",
        test: regexparam.parse("/abc", true),
        modules: [],
        loaded: false,
        elements: {},
      });

      expect(await matchLocation("/x")).toMatchSnapshot();
    });

    test("from 1 route", async () => {
      vi.mocked(getRouteTree).mockReturnValueOnce({
        path: "/",
        test: regexparam.parse("/", true),
        modules: [],
        loaded: false,
        elements: {},
      });

      expect(await matchLocation("/")).toMatchSnapshot();
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

      expect(await matchLocation("/abc")).toMatchSnapshot();
    });

    test("from 1 route with params", async () => {
      vi.mocked(getRouteTree).mockReturnValueOnce({
        path: "/[:id]",
        test: regexparam.parse("/:id", true),
        modules: [],
        loaded: false,
        elements: {},
      });

      expect(await matchLocation("/100")).toMatchSnapshot();
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

      expect(await matchLocation("/abc")).toMatchSnapshot();
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
              _void: {
                Main: <div>Void</div>,
              },
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

      expect(await matchLocation("/abc/xyz/100")).toMatchSnapshot();
    });
  });
});
