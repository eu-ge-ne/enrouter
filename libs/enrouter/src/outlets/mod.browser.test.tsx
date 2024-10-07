import type { FC, PropsWithChildren } from "react";
import { describe, test, expect } from "vitest";
import { render } from "vitest-browser-react";
import * as regexparam from "regexparam";

import { renderMatches } from "#render/mod.js";
import { Outlet } from "./mod.js";

import type { RouteMatch } from "#matches/mod.js";

const wrapperId = "test-wrapper";

const wrapper: FC<PropsWithChildren> = ({ children }) => (
  <div data-testid={wrapperId}>{children}</div>
);

describe("outlets", () => {
  test("using index elements", async () => {
    const matches: RouteMatch[] = [
      {
        params: {},
        handler: {
          route: {
            path: "/",
            mod: [],
            link: { css: [], mod: [] },
          },
          test: regexparam.parse("/", true),
          modules: [],
          layout: {
            main: (
              <div>
                <div>Layout</div>
                <Outlet name="main" />
              </div>
            ),
          },
          index: {
            main: <div>Index</div>,
          },
        },
      },
    ];

    const screen = render(renderMatches(matches), { wrapper });

    await expect.element(screen.getByTestId(wrapperId)).toBeVisible();
    expect(screen.container).toMatchSnapshot();
  });

  test("using next layout elements", async () => {
    const matches: RouteMatch[] = [
      {
        params: {},
        handler: {
          route: {
            path: "/",
            mod: [],
            link: { css: [], mod: [] },
          },
          test: regexparam.parse("/", true),
          modules: [],
          layout: {
            main: (
              <div>
                <div>Layout</div>
                <Outlet name="main" />
              </div>
            ),
          },
        },
      },
      {
        params: {},
        handler: {
          route: {
            path: "/a",
            mod: [],
            link: { css: [], mod: [] },
          },
          test: regexparam.parse("/a", true),
          modules: [],
          layout: {
            main: (
              <div>
                <div>Next layout</div>
              </div>
            ),
          },
        },
      },
    ];
    matches[0]!.next = matches[1];

    const screen = render(renderMatches(matches), { wrapper });

    await expect.element(screen.getByTestId(wrapperId)).toBeVisible();
    expect(screen.container).toMatchSnapshot();
  });
});
