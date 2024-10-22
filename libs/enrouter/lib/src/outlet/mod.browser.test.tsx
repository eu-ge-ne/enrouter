import type { FC, PropsWithChildren, ReactElement } from "react";
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
          page: {
            Main: (
              <div>
                <div>Page</div>
                <Outlet name="Next" />
              </div>
            ),
          },
          end: {
            Next: <div>Next not found</div>,
          },
        },
      },
      location: "/",
      isFull: false,
      params: {},
    };

    const screen = render(
      <MatchProvider value={match}>
        {(match.route.elements.page as Record<string, ReactElement>).Main}
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
          page: {
            Main: (
              <div>
                <div>Page</div>
                <Outlet name="Next" />
              </div>
            ),
          },
          index: {
            Next: <div>Index</div>,
          },
        },
      },
      location: "/",
      isFull: true,
      params: {},
    };

    const screen = render(
      <MatchProvider value={match}>
        {(match.route.elements.page as Record<string, ReactElement>).Main}
      </MatchProvider>,
      { wrapper },
    );

    await expect.element(screen.getByTestId(wrapperId)).toBeVisible();

    expect(screen.container).toMatchSnapshot();
  });

  test(`using "page" elements`, async () => {
    const match: Match = {
      route: {
        path: "/",
        test: regexparam.parse("/", true),
        modules: [],
        loaded: true,
        elements: {
          page: {
            Main: (
              <div>
                <div>Page</div>
                <Outlet name="Next" />
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
            page: {
              Next: (
                <div>
                  <div>Next</div>
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
        {(match.route.elements.page as Record<string, ReactElement>).Main}
      </MatchProvider>,
      { wrapper },
    );

    await expect.element(screen.getByTestId(wrapperId)).toBeVisible();

    expect(screen.container).toMatchSnapshot();
  });
});
