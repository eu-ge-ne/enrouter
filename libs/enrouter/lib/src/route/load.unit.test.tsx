import { describe, test, expect } from "vitest";
import * as regexparam from "regexparam";

import { loadRoutes } from "./load.js";

import type { Route } from "./mod.js";

describe("loadRoutes", () => {
  test("no routes", async () => {
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

  test("1 route with _layout.tsx module", async () => {
    const routes: Route[] = [
      {
        path: "/",
        test: regexparam.parse("/", true),
        modules: [
          {
            id: "src/_layout.tsx",
            fileName: "_layout.tsx",
            importFn: async () => ({
              components: {
                main: () => <div>Layout</div>,
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
              components: {
                main: () => <div>Index</div>,
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
