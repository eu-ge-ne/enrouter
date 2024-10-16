import type { FC, PropsWithChildren } from "react";
import { describe, test, expect } from "vitest";
import { render } from "vitest-browser-react";
import * as regexparam from "regexparam";

import { type TRouterContext, RouterContext } from "#lib/router/context.js";
import type { Match } from "#lib/match/mod.js";
import { renderMatches } from "./mod.js";

const wrapperId = "test-wrapper";

const wrapper: FC<PropsWithChildren> = ({ children }) => (
  <div data-testid={wrapperId}>{children}</div>
);

describe("renderMatches", () => {
  test("no matches", async () => {
    const context: TRouterContext = {
      routes: {
        path: "",
        test: { keys: [], pattern: new RegExp("") },
        modules: [],
        loaded: false,
        elements: {},
      },
      location: "/",
      navigate: () => undefined,
    };

    const matches: Match[] = [];

    const screen = render(renderMatches(matches), {
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
    const matches: Match[] = [
      {
        route: {
          path: "/",
          test: regexparam.parse("/", true),
          modules: [],
          loaded: false,
          elements: {},
        },
        location: "/",
        isFull: true,
        params: {},
      },
    ];

    const screen = render(renderMatches(matches), { wrapper });

    await expect.element(screen.getByTestId(wrapperId)).toBeVisible();
    expect(screen.container).toMatchSnapshot();
  });

  test("1 match with layout elements", async () => {
    const matches: Match[] = [
      {
        route: {
          path: "/",
          test: regexparam.parse("/", true),
          modules: [],
          loaded: true,
          elements: {
            layout: {
              main: <div>Layout</div>,
            },
          },
        },
        location: "/",
        isFull: true,
        params: {},
      },
    ];

    const screen = render(renderMatches(matches), { wrapper });

    await expect.element(screen.getByTestId(wrapperId)).toBeVisible();
    expect(screen.container).toMatchSnapshot();
  });
});
