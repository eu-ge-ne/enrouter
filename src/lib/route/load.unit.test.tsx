import { describe, test, expect } from "vitest";
import * as regexparam from "regexparam";

import type { Route } from "./route.js";
import { loadRoutes } from "./load.js";

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

    test("1 route with _layout.tsx module with multiple components", async () => {
      const routes: Route[] = [
        {
          path: "/",
          test: regexparam.parse("/", true),
          modules: [
            {
              id: "src/_layout.tsx",
              fileName: "_layout.tsx",
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

    test("1 route with already loaded _layout.tsx", async () => {
      const routes: Route[] = [
        {
          path: "/",
          test: regexparam.parse("/", true),
          modules: [],
          loaded: true,
          elements: {
            _layout: {
              Main: <div>Page</div>,
            },
          },
        },
      ];

      await loadRoutes(routes);

      expect(routes).toMatchSnapshot();
    });

    test("1 route with _content.tsx module", async () => {
      const routes: Route[] = [
        {
          path: "/",
          test: regexparam.parse("/", true),
          modules: [
            {
              id: "src/_content.tsx",
              fileName: "_content.tsx",
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

    test("1 route with _fallback.tsx module", async () => {
      const routes: Route[] = [
        {
          path: "/",
          test: regexparam.parse("/", true),
          modules: [
            {
              id: "src/_fallback.tsx",
              fileName: "_fallback.tsx",
              importFn: async () => ({
                default: {
                  Main: () => <div>fallback</div>,
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
  });
});
