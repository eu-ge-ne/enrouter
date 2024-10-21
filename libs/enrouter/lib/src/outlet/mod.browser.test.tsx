import type { FC, PropsWithChildren } from "react";
import { describe, test, expect } from "vitest";
import { render } from "vitest-browser-react";
import * as regexparam from "regexparam";

import type { Match } from "#lib/match/mod.js";
import { MatchProvider } from "#lib/match/context.js";
import { Outlet } from "./mod.js";

const wrapperId = "test-wrapper";

const wrapper: FC<PropsWithChildren> = ({ children }) => (
  <div data-testid={wrapperId}>{children}</div>
);

describe("outlet", () => {
  test('using "end" elements', async () => {
    const match: Match = {
      route: {
        path: "/",
        test: regexparam.parse("/", true),
        modules: [],
        loaded: true,
        elements: {
          this: {
            Root: (
              <div>
                <div>Layout</div>
                <Outlet name="Main" />
              </div>
            ),
          },
          end: {
            Main: <div>Root/Main: not found</div>,
          },
        },
      },
      location: "/",
      isFull: false,
      params: {},
    };

    const screen = render(
      <MatchProvider value={match}>
        {match.route.elements.this?.Root}
      </MatchProvider>,
      { wrapper },
    );

    await expect.element(screen.getByTestId(wrapperId)).toBeVisible();

    expect(screen.container).toMatchSnapshot();
  });

  test(`using "index" elements`, async () => {
    const match: Match = {
      route: {
        path: "/",
        test: regexparam.parse("/", true),
        modules: [],
        loaded: true,
        elements: {
          this: {
            Root: (
              <div>
                <div>Layout</div>
                <Outlet name="Main" />
              </div>
            ),
          },
          index: {
            Main: <div>Index</div>,
          },
        },
      },
      location: "/",
      isFull: true,
      params: {},
    };

    const screen = render(
      <MatchProvider value={match}>
        {Object.values(match.route.elements.this ?? {})}
      </MatchProvider>,
      { wrapper },
    );

    await expect.element(screen.getByTestId(wrapperId)).toBeVisible();

    expect(screen.container).toMatchSnapshot();
  });

  test(`using "this" elements`, async () => {
    const match: Match = {
      route: {
        path: "/",
        test: regexparam.parse("/", true),
        modules: [],
        loaded: true,
        elements: {
          this: {
            Root: (
              <div>
                <div>Layout</div>
                <Outlet name="Main" />
              </div>
            ),
          },
        },
      },
      location: "/",
      isFull: false,
      params: {},

      next: {
        route: {
          path: "/a",
          test: regexparam.parse("/a", true),
          modules: [],
          loaded: true,
          elements: {
            this: {
              Main: (
                <div>
                  <div>Next layout</div>
                </div>
              ),
            },
          },
        },
        location: "/a",
        isFull: true,
        params: {},
      },
    };

    const screen = render(
      <MatchProvider value={match}>
        {Object.values(match.route.elements.this ?? {})}
      </MatchProvider>,
      { wrapper },
    );

    await expect.element(screen.getByTestId(wrapperId)).toBeVisible();

    expect(screen.container).toMatchSnapshot();
  });
});
