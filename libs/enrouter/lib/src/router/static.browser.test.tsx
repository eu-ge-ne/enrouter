import type { FC, PropsWithChildren } from "react";
import { describe, test, expect } from "vitest";
import { render } from "vitest-browser-react";
import * as regexparam from "regexparam";

import type { Route } from "#lib/route/mod.js";
import type { Match } from "#lib/match/mod.js";
import { load } from "#lib/match/load.js";
import { Static } from "./static.js";

const wrapperId = "test-wrapper";

const wrapper: FC<PropsWithChildren> = ({ children }) => (
  <div data-testid={wrapperId}>{children}</div>
);

describe("router", () => {
  describe("Static", () => {
    test("1 route and 1 match", async () => {
      const routes: Route = {
        path: "/",
        test: regexparam.parse("/", true),
        modules: [],
        loaded: true,
        elements: {
          layout: {
            Root: <div>Layout</div>,
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

      await load(matches);

      const screen = render(
        <Static routes={routes} location="/" matches={matches} />,
        {
          wrapper,
        },
      );

      await expect.element(screen.getByTestId(wrapperId)).toBeVisible();

      expect(screen.container).toMatchSnapshot();
    });
  });
});
