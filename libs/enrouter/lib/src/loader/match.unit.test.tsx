import { describe, test, expect } from "vitest";
import * as regexparam from "regexparam";

import { loadRouteMatches } from "./match.js";

import type { RouteMatch } from "#lib/match/mod.js";

describe("loadRouteMatches", () => {
  test("no matches", async () => {
    const matches: RouteMatch[] = [];

    await loadRouteMatches({ matches });

    expect(matches).toMatchSnapshot();
  });

  test("1 match with no modules", async () => {
    const matches: RouteMatch[] = [
      {
        handler: {
          route: {
            path: "/",
            modules: [],
          },
          test: regexparam.parse("/", true),
          modules: [],
        },
        location: "/",
        isFull: true,
        params: {},
      },
    ];

    await loadRouteMatches({ matches });

    expect(matches).toMatchSnapshot();
  });

  test("1 match with _layout.tsx module", async () => {
    const matches: RouteMatch[] = [
      {
        handler: {
          route: {
            path: "/",
            modules: [
              {
                id: "_layout.tsx",
                fileName: "_layout.tsx",
                load: async () => undefined,
              },
            ],
          },
          test: regexparam.parse("/", true),
          modules: [{ id: "_layout.tsx" }],
        },
        location: "/",
        isFull: true,
        params: {},
      },
    ];

    /*
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
    */

    await loadRouteMatches({ matches });

    expect(matches).toMatchSnapshot();
  });

  test("1 match with _index.tsx module", async () => {
    const matches: RouteMatch[] = [
      {
        handler: {
          route: {
            path: "/",
            modules: [
              {
                id: "_index.tsx",
                fileName: "_index.tsx",
                load: async () => undefined,
              },
            ],
          },
          test: regexparam.parse("/", true),
          modules: [{ id: "_index.tsx" }],
        },
        location: "/",
        isFull: true,
        params: {},
      },
    ];

    /*
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
    */

    await loadRouteMatches({ matches });

    expect(matches).toMatchSnapshot();
  });
});
