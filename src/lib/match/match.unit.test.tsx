import { describe, test, expect, vi } from "vitest";
import * as regexparam from "regexparam";

import { getRouteTree } from "#lib/route/tree.js";
import { matchLocation } from "./match.js";

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
        loaded: true,
        elements: {},
      });

      expect(await matchLocation("/x")).toMatchSnapshot();
    });

    test("1 match", async () => {
      vi.mocked(getRouteTree).mockReturnValueOnce({
        path: "/",
        test: regexparam.parse("/", true),
        modules: [],
        loaded: true,
        elements: {},
      });

      expect(await matchLocation("/")).toMatchSnapshot();
    });

    test("2 matches", async () => {
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
            elements: {},
          },
        ],
      });

      expect(await matchLocation("/abc")).toMatchSnapshot();
    });

    test("1 match with params", async () => {
      vi.mocked(getRouteTree).mockReturnValueOnce({
        path: "/[:id]",
        test: regexparam.parse("/:id", true),
        modules: [],
        loaded: true,
        elements: {},
      });

      expect(await matchLocation("/100")).toMatchSnapshot();
    });

    test("1 match and 1 match with params", async () => {
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
            elements: {},
          },
          {
            path: "/[:id]",
            test: regexparam.parse("/:id", true),
            modules: [],
            loaded: true,
            elements: {},
          },
        ],
      });

      expect(await matchLocation("/abc")).toMatchSnapshot();
    });

    test("3 matches and 1 not found", async () => {
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
            elements: {},
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
