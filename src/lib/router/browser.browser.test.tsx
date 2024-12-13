import type { FC, PropsWithChildren } from "react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "@vitest/browser/context";
import * as regexparam from "regexparam";

import type { Route } from "#lib/route/mod.js";
import type { Match } from "#lib/match/match.js";
import { getRouteTree } from "#lib/route/tree.js";
import { useLink } from "#lib/link/mod.js";
import { Outlet } from "#lib/outlet/outlet.js";
import { BrowserRouter } from "./browser.js";
import { assignLocation, pushHistory } from "#lib/browser/mod.js";

const testId = "test-wrapper";

const wrapper: FC<PropsWithChildren> = ({ children }) => (
  <div data-testid={testId}>{children}</div>
);

vi.mock(import("#lib/route/tree.js"), () => ({
  getRouteTree: vi.fn(),
}));

vi.mock(import("#lib/browser/mod.js"), () => ({
  pushHistory: vi.fn(),
  assignLocation: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("router", () => {
  describe("BrowserRouter", () => {
    test("link", async () => {
      function TestLink() {
        const props = useLink("/abc");
        return <a {...props}>link to /abc</a>;
      }

      const route: Route = {
        path: "/",
        test: regexparam.parse("/", true),
        modules: [],
        loaded: true,
        elements: {
          _layout: {
            Root: (
              <div>
                <TestLink />
                <Outlet />
              </div>
            ),
          },
        },
        tree: [
          {
            path: "/abc",
            test: regexparam.parse("/abc", true),
            modules: [],
            loaded: true,
            elements: {
              _layout: {
                Abc: <div>abc layout</div>,
              },
            },
          },
        ],
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

      await userEvent.click(screen.getByRole("link"));
      await expect.element(screen.getByText("abc layout")).toBeVisible();

      expect(pushHistory).toBeCalledTimes(1);
      expect(pushHistory).toBeCalledWith("/abc");

      expect(assignLocation).not.toBeCalled();
    });
  });
});
