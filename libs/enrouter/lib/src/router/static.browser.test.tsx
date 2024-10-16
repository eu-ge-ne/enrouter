import type { FC, PropsWithChildren } from "react";
import { describe, test, expect } from "vitest";
import { render } from "vitest-browser-react";
import * as regexparam from "regexparam";

import { StaticRouter } from "./static.js";
import type { Route } from "#lib/route/mod.js";
import type { Match } from "#lib/match/mod.js";

const wrapperId = "test-wrapper";

const wrapper: FC<PropsWithChildren> = ({ children }) => (
  <div data-testid={wrapperId}>{children}</div>
);

describe("router/static", () => {
  test("1 route and 1 match", async () => {
    const routes: Route = {
      path: "/",
      test: regexparam.parse("/", true),
      modules: [],
      loaded: true,
      elements: {
        layout: {
          main: <div>Layout</div>,
        },
      },
    };

    const matches: Match[] = [
      {
        route: routes,
        location: "/",
        isFull: true,
        params: {},
      },
    ];

    const screen = render(
      <StaticRouter routes={routes} location="/" matches={matches} />,
      {
        wrapper,
      },
    );

    await expect.element(screen.getByTestId(wrapperId)).toBeVisible();
    expect(screen.container).toMatchSnapshot();
  });
});
