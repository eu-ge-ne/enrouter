import { describe, test, expect } from "vitest";
import * as regexparam from "regexparam";

import { loadRouteHandlers } from "./handler.js";

import type { RouteModules } from "#lib/modules.js";
import type { RouteHandler } from "#lib/handler/mod.js";

describe("loadRouteHandlers", () => {
  test("1 route handler with no modules", async () => {
    const handlers: RouteHandler = {
      route: {
        path: "/",
        mod: [],
        link: [[], []],
      },
      test: regexparam.parse("/", true),
      modules: [],
    };

    await loadRouteHandlers({ handlers, modules: {} });

    expect(handlers).toMatchSnapshot();
  });

  test("2 route handlers with no modules", async () => {
    const handlers: RouteHandler = {
      route: {
        path: "/",
        mod: [],
        link: [[], []],
      },
      test: regexparam.parse("/", true),
      modules: [],
      tree: [
        {
          route: {
            path: "/abc",
            mod: [],
            link: [[], []],
          },
          test: regexparam.parse("/abc", true),
          modules: [],
        },
      ],
    };

    await loadRouteHandlers({ handlers, modules: {} });

    expect(handlers).toMatchSnapshot();
  });

  test("1 route handler with 1 _layout.tsx module", async () => {
    const handlers: RouteHandler = {
      route: {
        path: "/",
        mod: ["_layout.tsx"],
        link: [[], []],
      },
      test: regexparam.parse("/", true),
      modules: [{ id: "_layout.tsx" }],
    };

    const modules: RouteModules = {
      "_layout.tsx": {
        dirPath: ["src"],
        fileName: "_layout.tsx",
        load: async () => ({
          components: {
            main: () => <div>Layout</div>,
          },
        }),
      },
    };

    await loadRouteHandlers({ handlers, modules });

    expect(handlers).toMatchSnapshot();
  });

  test("1 route handler with 1 _index.tsx module", async () => {
    const handlers: RouteHandler = {
      route: {
        path: "/",
        mod: ["_index.tsx"],
        link: [[], []],
      },
      test: regexparam.parse("/", true),
      modules: [{ id: "_index.tsx" }],
    };

    const modules: RouteModules = {
      "_index.tsx": {
        dirPath: ["src"],
        fileName: "_index.tsx",
        load: async () => ({
          components: {
            main: () => <div>Index</div>,
          },
        }),
      },
    };

    await loadRouteHandlers({ handlers, modules });

    expect(handlers).toMatchSnapshot();
  });
});
