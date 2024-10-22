import type { FC, PropsWithChildren } from "react";
import { describe, test, expect } from "vitest";
import { render } from "vitest-browser-react";
import * as regexparam from "regexparam";

import type { Route } from "#lib/route/mod.js";
import type { Match } from "#lib/match/mod.js";
import { Browser } from "./browser.js";

const wrapperId = "test-wrapper";

const wrapper: FC<PropsWithChildren> = ({ children }) => (
  <div data-testid={wrapperId}>{children}</div>
);

describe("router", () => {
  describe("Browser", () => {
    test("_root", async () => {
      const route: Route = {
        path: "/",
        test: regexparam.parse("/", true),
        modules: [],
        loaded: true,
        elements: {
          _root: <div>Root</div>,
        },
      };

      const match: Match = {
        route,
        location: "/",
        isFull: true,
        params: {},
      };

      const screen = render(<Browser routes={route} match={match} />, {
        wrapper,
      });

      await expect.element(screen.getByTestId(wrapperId)).toBeVisible();

      expect(screen.container).toMatchSnapshot();
    });
  });
});
