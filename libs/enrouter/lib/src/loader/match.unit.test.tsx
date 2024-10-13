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
        route: {
          path: "/",
          test: regexparam.parse("/", true),
          modules: [],
          loaded: false,
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
          loaded: false,
        },
        location: "/",
        isFull: true,
        params: {},
      },
    ];

    await loadRouteMatches({ matches });

    expect(matches).toMatchSnapshot();
  });

  test("1 match with _index.tsx module", async () => {
    const matches: RouteMatch[] = [
      {
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
          loaded: false,
        },
        location: "/",
        isFull: true,
        params: {},
      },
    ];

    await loadRouteMatches({ matches });

    expect(matches).toMatchSnapshot();
  });
});
