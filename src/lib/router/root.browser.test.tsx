import type { FC, PropsWithChildren } from "react";
import { describe, test, expect, vi } from "vitest";
import { render } from "vitest-browser-react";
import * as regexparam from "regexparam";

import type { Route } from "#lib/route/mod.js";
import type { Match } from "#lib/match/mod.js";
import { getRouteTree } from "#lib/route/tree.js";
import { BrowserRouter } from "./browser.js";

const wrapperId = "test-wrapper";

const wrapper: FC<PropsWithChildren> = ({ children }) => (
  <div data-testid={wrapperId}>{children}</div>
);

vi.mock(import("#lib/route/tree.js"), () => ({
  getRouteTree: vi.fn(),
}));

describe("router", () => {
  describe("BrowserRouter", () => {
    test("root", async () => {
      const route: Route = {
        path: "/",
        test: regexparam.parse("/", true),
        modules: [],
        loaded: true,
        elements: {
          _layout: {
            Root: <div>Root</div>,
          },
        },
      };

      vi.mocked(getRouteTree).mockReturnValueOnce(route);

      const matches: Match[] = [
        {
          isVoid: false,
          route,
          location: "/",
          isExact: true,
          params: {},
        },
      ];

      const screen = render(<BrowserRouter matches={matches} />, { wrapper });

      await expect.element(screen.getByTestId(wrapperId)).toBeVisible();

      expect(screen.container).toMatchSnapshot();
    });
  });
});
