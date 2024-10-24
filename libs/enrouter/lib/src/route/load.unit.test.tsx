import { describe, test, expect } from "vitest";
import * as regexparam from "regexparam";

import { loadRoutes } from "./load.js";

import type { Route } from "./mod.js";

describe("route", () => {
  describe("loadRoutes", () => {
    test("0 routes", async () => {
      const routes: Route[] = [];

      await loadRoutes(routes);

      expect(routes).toMatchSnapshot();
    });

    test("1 route no modules", async () => {
      const routes: Route[] = [
        {
          path: "/",
          test: regexparam.parse("/", true),
          modules: [],
          loaded: false,
          elements: {},
        },
      ];

      await loadRoutes(routes);

      expect(routes).toMatchSnapshot();
    });

    test("1 route with _root.tsx module", async () => {
      const routes: Route[] = [
        {
          path: "/",
          test: regexparam.parse("/", true),
          modules: [
            {
              id: "src/_root.tsx",
              fileName: "_root.tsx",
              importFn: async () => ({
                default: () => <div>Root</div>,
              }),
            },
          ],
          loaded: false,
          elements: {},
        },
      ];

      await loadRoutes(routes);

      expect(routes).toMatchSnapshot();
    });

    test("1 route with _page.tsx module with multiple components", async () => {
      const routes: Route[] = [
        {
          path: "/",
          test: regexparam.parse("/", true),
          modules: [
            {
              id: "src/_page.tsx",
              fileName: "_page.tsx",
              importFn: async () => ({
                default: {
                  Main: () => <div>Page</div>,
                  Menu: () => <div>Page</div>,
                },
              }),
            },
          ],
          loaded: false,
          elements: {},
        },
      ];

      await loadRoutes(routes);

      expect(routes).toMatchSnapshot();
    });

    test("1 route with _page.tsx module with single components", async () => {
      const routes: Route[] = [
        {
          path: "/",
          test: regexparam.parse("/", true),
          modules: [
            {
              id: "src/_page.tsx",
              fileName: "_page.tsx",
              importFn: async () => ({
                default: () => <div>Page</div>,
              }),
            },
          ],
          loaded: false,
          elements: {},
        },
      ];

      await loadRoutes(routes);

      expect(routes).toMatchSnapshot();
    });

    test("1 route with already loaded _page.tsx", async () => {
      const routes: Route[] = [
        {
          path: "/",
          test: regexparam.parse("/", true),
          modules: [],
          loaded: true,
          elements: {
            _page: <div>Page</div>,
          },
        },
      ];

      await loadRoutes(routes);

      expect(routes).toMatchSnapshot();
    });

    test("1 route with _index.tsx module", async () => {
      const routes: Route[] = [
        {
          path: "/",
          test: regexparam.parse("/", true),
          modules: [
            {
              id: "src/_index.tsx",
              fileName: "_index.tsx",
              importFn: async () => ({
                default: {
                  Main: () => <div>Index</div>,
                },
              }),
            },
          ],
          loaded: false,
          elements: {},
        },
      ];

      await loadRoutes(routes);

      expect(routes).toMatchSnapshot();
    });

    test("1 route with _void.tsx module", async () => {
      const routes: Route[] = [
        {
          path: "/",
          test: regexparam.parse("/", true),
          modules: [
            {
              id: "src/_void.tsx",
              fileName: "_void.tsx",
              importFn: async () => ({
                default: {
                  Main: () => <div>Void</div>,
                },
              }),
            },
          ],
          loaded: false,
          elements: {},
        },
      ];

      await loadRoutes(routes);

      expect(routes).toMatchSnapshot();
    });

    test("1 route with __void.tsx module", async () => {
      const routes: Route[] = [
        {
          path: "/",
          test: regexparam.parse("/", true),
          modules: [
            {
              id: "src/__void.tsx",
              fileName: "__void.tsx",
              importFn: async () => ({
                default: () => <div>Void</div>,
              }),
            },
          ],
          loaded: false,
          elements: {},
        },
      ];

      await loadRoutes(routes);

      expect(routes).toMatchSnapshot();
    });
  });
});
