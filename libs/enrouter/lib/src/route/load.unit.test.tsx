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

    test("1 route with _layout.tsx module with single component", async () => {
      const routes: Route[] = [
        {
          path: "/",
          test: regexparam.parse("/", true),
          modules: [
            {
              id: "src/_layout.tsx",
              fileName: "_layout.tsx",
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

    test("1 route with already loaded _layout.tsx", async () => {
      const routes: Route[] = [
        {
          path: "/",
          test: regexparam.parse("/", true),
          modules: [],
          loaded: true,
          elements: {
            _layout: <div>Page</div>,
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
  });
});
