import type { FC, PropsWithChildren } from "react";
import { describe, test, expect } from "vitest";
import { render } from "vitest-browser-react";
import * as regexparam from "regexparam";

import { renderMatches } from "./mod.js";
import { RouterContext } from "../routers/context.js";

import type { RouteMatch } from "#matches/mod.js";
import type { TRouterContext } from "../routers/context.js";

const wrapperId = "test-wrapper";

const wrapper: FC<PropsWithChildren> = ({ children }) => (
  <div data-testid={wrapperId}>{children}</div>
);

describe("renderMatches", () => {
  test("no matches", async () => {
    const context: TRouterContext = {
      handlers: {
        route: {
          path: "",
          mod: [],
          link: [[], []],
        },
        test: { keys: [], pattern: new RegExp("") },
        modules: [],
      },
      location: "/",
      navigate: () => undefined,
    };

    const matches: RouteMatch[] = [];

    const screen = render(renderMatches(matches, "/"), {
      wrapper: ({ children }) => (
        <div data-testid={wrapperId}>
          <RouterContext.Provider value={context}>
            {children}
          </RouterContext.Provider>
        </div>
      ),
    });

    await expect.element(screen.getByTestId(wrapperId)).toBeVisible();
    expect(screen.container).toMatchSnapshot();
  });

  test("1 match with no elements", async () => {
    const matches: RouteMatch[] = [
      {
        handler: {
          route: {
            path: "/",
            mod: [],
            link: [[], []],
          },
          test: regexparam.parse("/", true),
          modules: [],
        },
        location: "/",
        params: {},
      },
    ];

    const screen = render(renderMatches(matches, "/"), { wrapper });

    await expect.element(screen.getByTestId(wrapperId)).toBeVisible();
    expect(screen.container).toMatchSnapshot();
  });

  test("1 match with layout elements", async () => {
    const matches: RouteMatch[] = [
      {
        handler: {
          route: {
            path: "/",
            mod: [],
            link: [[], []],
          },
          test: regexparam.parse("/", true),
          modules: [],
          layout: {
            main: <div>Layout</div>,
          },
        },
        location: "/",
        params: {},
      },
    ];

    const screen = render(renderMatches(matches, "/"), { wrapper });

    await expect.element(screen.getByTestId(wrapperId)).toBeVisible();
    expect(screen.container).toMatchSnapshot();
  });
});
