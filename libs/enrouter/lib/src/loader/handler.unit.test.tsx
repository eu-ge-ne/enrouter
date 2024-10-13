import { describe, test, expect } from "vitest";
import * as regexparam from "regexparam";

import { loadRouteHandlers } from "./handler.js";

import type { RouteHandler } from "#lib/handler/mod.js";

describe("loadRouteHandlers", () => {
  test("1 route handler with no modules", async () => {
    const handlers: RouteHandler = {
      route: {
        path: "/",
        test: regexparam.parse("/", true),
        modules: [],
      },
      modules: [],
    };

    await loadRouteHandlers({ handlers });

    expect(handlers).toMatchSnapshot();
  });

  test("2 route handlers with no modules", async () => {
    const handlers: RouteHandler = {
      route: {
        path: "/",
        test: regexparam.parse("/", true),
        modules: [],
      },
      modules: [],
      tree: [
        {
          route: {
            path: "/abc",
            test: regexparam.parse("/abc", true),
            modules: [],
          },
          modules: [],
        },
      ],
    };

    await loadRouteHandlers({ handlers });

    expect(handlers).toMatchSnapshot();
  });

  test("1 route handler with 1 _layout.tsx module", async () => {
    const handlers: RouteHandler = {
      route: {
        path: "/",
        test: regexparam.parse("/", true),
        modules: [
          {
            id: "_layout.tsx",
            fileName: "_layout.tsx",
            load: async () => ({
              components: {
                main: () => <div>Layout</div>,
              },
            }),
          },
        ],
      },
      modules: [{ id: "_layout.tsx" }],
    };

    await loadRouteHandlers({ handlers });

    expect(handlers).toMatchSnapshot();
  });

  test("1 route handler with 1 _index.tsx module", async () => {
    const handlers: RouteHandler = {
      route: {
        path: "/",
        test: regexparam.parse("/", true),
        modules: [
          {
            id: "_index.tsx",
            fileName: "_index.tsx",
            load: async () => ({
              components: {
                main: () => <div>Index</div>,
              },
            }),
          },
        ],
      },
      modules: [{ id: "_index.tsx" }],
    };

    await loadRouteHandlers({ handlers });

    expect(handlers).toMatchSnapshot();
  });
});
