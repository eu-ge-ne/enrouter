import type { FC, PropsWithChildren } from "react";
import { describe, test, expect, vi } from "vitest";
import { render } from "vitest-browser-react";
import * as regexparam from "regexparam";

import type { Route } from "#lib/route/route.js";
import type { Match } from "#lib/match/match.js";
import { getRouteTree } from "#lib/route/tree.js";
import { BrowserRouter } from "#lib/router/browser.js";

const testId = "test-wrapper";

const wrapper: FC<PropsWithChildren> = ({ children }) => (
  <div data-testid={testId}>{children}</div>
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
          route,
          location: "/",
          params: {},
        },
      ];

      const screen = render(<BrowserRouter matches={matches} />, { wrapper });

      await expect.element(screen.getByTestId(testId)).toBeVisible();

      expect(screen.container).toMatchSnapshot();
    });
  });
});
