import type { FC, PropsWithChildren } from "react";
import { describe, test, expect } from "vitest";
import { render } from "vitest-browser-react";
import * as regexparam from "regexparam";

import { renderMatches } from "./mod.js";

import type { RouteMatch } from "#matches/mod.js";

const wrapperId = "test-wrapper";

const wrapper: FC<PropsWithChildren> = ({ children }) => (
  <div data-testid={wrapperId}>{children}</div>
);

describe("renderMatches", () => {
  test("no matches", async () => {
    const matches: RouteMatch[] = [];

    const screen = render(renderMatches(matches), { wrapper });

    await expect.element(screen.getByTestId(wrapperId)).toBeVisible();
    expect(screen.container).toMatchSnapshot();
  });

  test("1 match with no elements", async () => {
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

    const screen = render(renderMatches(matches), { wrapper });

    await expect.element(screen.getByTestId(wrapperId)).toBeVisible();
    expect(screen.container).toMatchSnapshot();
  });

  test("1 match with layout elements", async () => {
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
          layout: {
            main: <div>Layout</div>,
          },
        },
      },
    ];

    const screen = render(renderMatches(matches), { wrapper });

    await expect.element(screen.getByTestId(wrapperId)).toBeVisible();
    expect(screen.container).toMatchSnapshot();
  });
});
