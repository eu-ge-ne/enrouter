import { describe, test, expect } from "vitest";
import * as regexparam from "regexparam";

import { loadRouteMatches } from "./matches.js";

import type { RouteModules } from "#modules.js";
import type { RouteMatch } from "#matches/mod.js";

describe("loadRouteMatches", () => {
  test("no matches", async () => {
    const matches: RouteMatch[] = [];

    await loadRouteMatches({ matches, modules: {} });

    expect(matches).toMatchSnapshot();
  });

  test("1 match with no modules", async () => {
    const matches: RouteMatch[] = [
      {
        params: {},
        handler: {
          route: {
            path: "/",
            mod: [],
            link: [[], []],
          },
          test: regexparam.parse("/", true),
          modules: [],
        },
      },
    ];

    await loadRouteMatches({ matches, modules: {} });

    expect(matches).toMatchSnapshot();
  });

  test("1 match with _layout.tsx module", async () => {
    const matches: RouteMatch[] = [
      {
        params: {},
        handler: {
          route: {
            path: "/",
            mod: ["_layout.tsx"],
            link: [[], []],
          },
          test: regexparam.parse("/", true),
          modules: [{ id: "_layout.tsx" }],
        },
      },
    ];

    const modules: RouteModules = {
      "_layout.tsx": {
        path: "src/_layout.tsx",
        load: async () => ({
          components: {
            main: () => <div>Layout</div>,
          },
        }),
      },
    };

    await loadRouteMatches({ matches, modules });

    expect(matches).toMatchSnapshot();
  });

  test("1 match with _index.tsx module", async () => {
    const matches: RouteMatch[] = [
      {
        params: {},
        handler: {
          route: {
            path: "/",
            mod: ["_index.tsx"],
            link: [[], []],
          },
          test: regexparam.parse("/", true),
          modules: [{ id: "_index.tsx" }],
        },
      },
    ];

    const modules: RouteModules = {
      "_index.tsx": {
        path: "src/_index.tsx",
        load: async () => ({
          components: {
            main: () => <div>Index</div>,
          },
        }),
      },
    };

    await loadRouteMatches({ matches, modules });

    expect(matches).toMatchSnapshot();
  });
});
