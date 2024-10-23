import type { FC, PropsWithChildren } from "react";
import { describe, test, expect, vi } from "vitest";
import { render } from "vitest-browser-react";
import * as regexparam from "regexparam";

import type { Route } from "#lib/route/mod.js";
import type { Match } from "#lib/match/mod.js";
import { getRouteTree } from "#lib/route/tree.js";
import { Browser } from "./browser.js";

const wrapperId = "test-wrapper";

const wrapper: FC<PropsWithChildren> = ({ children }) => (
  <div data-testid={wrapperId}>{children}</div>
);

vi.mock(import("#lib/route/tree.js"), () => ({
  getRouteTree: vi.fn(),
}));

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

      vi.mocked(getRouteTree).mockReturnValueOnce(route);

      const match: Match = {
        route,
        location: "/",
        isFull: true,
        params: {},
      };

      const screen = render(<Browser match={match} />, {
        wrapper,
      });

      await expect.element(screen.getByTestId(wrapperId)).toBeVisible();

      expect(screen.container).toMatchSnapshot();
    });
  });
});
