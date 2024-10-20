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
  test("using notFound elements", async () => {
    const matches: Match[] = [
      {
        route: {
          path: "/",
          test: regexparam.parse("/", true),
          modules: [],
          loaded: true,
          elements: {
            layout: {
              Root: (
                <div>
                  <div>Layout</div>
                  <Outlet name="Main" />
                </div>
              ),
            },
            notFound: {
              Main: <div>Root/Main: not found</div>,
            },
          },
        },
        location: "/",
        isFull: false,
        params: {},
      },
    ];

    const screen = render(
      <MatchProvider value={matches[0]!}>
        {matches[0]?.route.elements.layout?.Root}
      </MatchProvider>,
      { wrapper },
    );

    await expect.element(screen.getByTestId(wrapperId)).toBeVisible();

    expect(screen.container).toMatchSnapshot();
  });

  test("using index elements", async () => {
    const matches: Match[] = [
      {
        route: {
          path: "/",
          test: regexparam.parse("/", true),
          modules: [],
          loaded: true,
          elements: {
            layout: {
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
      },
    ];

    const screen = render(
      <MatchProvider value={matches[0]!}>
        {Object.values(matches[0]?.route?.elements.layout ?? {})}
      </MatchProvider>,
      { wrapper },
    );

    await expect.element(screen.getByTestId(wrapperId)).toBeVisible();

    expect(screen.container).toMatchSnapshot();
  });

  test("using next layout elements", async () => {
    const matches: Match[] = [
      {
        route: {
          path: "/",
          test: regexparam.parse("/", true),
          modules: [],
          loaded: true,
          elements: {
            layout: {
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
      },
      {
        route: {
          path: "/a",
          test: regexparam.parse("/a", true),
          modules: [],
          loaded: true,
          elements: {
            layout: {
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
    ];
    matches[0]!.next = matches[1];

    const screen = render(
      <MatchProvider value={matches[0]!}>
        {Object.values(matches[0]?.route?.elements.layout ?? {})}
      </MatchProvider>,
      { wrapper },
    );

    await expect.element(screen.getByTestId(wrapperId)).toBeVisible();

    expect(screen.container).toMatchSnapshot();
  });
});
