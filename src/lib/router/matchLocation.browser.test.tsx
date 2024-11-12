import type { FC, PropsWithChildren } from "react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "@vitest/browser/context";
import * as regexparam from "regexparam";

import type { Route } from "#lib/route/mod.js";
import type { Match } from "#lib/match/mod.js";
import { getRouteTree } from "#lib/route/tree.js";
import { matchLocation } from "#lib/match/location.js";
import { useLink } from "#lib/link/mod.js";
import { Outlet } from "#lib/outlet/mod.js";
import { BrowserRouter } from "./browser.js";
import { assignLocation, pushHistory } from "#lib/browser/mod.js";

const wrapperId = "test-wrapper";

const wrapper: FC<PropsWithChildren> = ({ children }) => (
  <div data-testid={wrapperId}>{children}</div>
);

vi.mock(import("#lib/route/tree.js"), () => ({
  getRouteTree: vi.fn(),
}));

vi.mock(import("#lib/browser/mod.js"), () => ({
  pushHistory: vi.fn(),
  assignLocation: vi.fn(),
}));

vi.mock(import("#lib/match/location.js"), { spy: true });

beforeEach(() => {
  vi.clearAllMocks();
});

describe("router", () => {
  describe("BrowserRouter", () => {
    test("matchLocation fails", async () => {
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
                Abc: <div>abc</div>,
              },
            },
          },
        ],
      };

      vi.mocked(getRouteTree).mockReturnValueOnce(route);
      vi.mocked(matchLocation).mockRejectedValueOnce(
        new Error("matchLocation error"),
      );

      const match: Match = {
        isVoid: false,
        route,
        location: "/",
        isExact: true,
        params: {},
      };

      match.first = match;
      match.last = match;

      const screen = render(<BrowserRouter match={match} />, { wrapper });

      await userEvent.click(screen.getByRole("link"));
      await expect.element(screen.getByTestId(wrapperId)).toBeVisible();

      expect(pushHistory).not.toBeCalled();

      expect(matchLocation).toBeCalledTimes(1);

      expect(assignLocation).toBeCalledTimes(1);
      expect(assignLocation).toBeCalledWith("/abc");
    });
  });
});
