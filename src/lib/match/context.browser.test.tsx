import type { FC, PropsWithChildren, ReactElement } from "react";
import { describe, test, expect } from "vitest";
import { render } from "vitest-browser-react";
import * as regexparam from "regexparam";

import type { Match } from "./match.js";
import {
  MatchesProvider,
  MatchIndexProvider,
  useMatches,
  useMatch,
} from "./context.js";

const testId = "test-wrapper";

const wrapper: FC<PropsWithChildren> = ({ children }) => (
  <div data-testid={testId}>{children}</div>
);

describe("match", () => {
  describe("useMatches", () => {
    test("1 match", async () => {
      const matches: Match[] = [
        {
          route: {
            path: "/",
            test: regexparam.parse("/", true),
            modules: [],
            loaded: true,
            elements: {
              _layout: {
                Main: <div>Page /</div>,
              },
            },
          },
          location: "/",
          params: {},
        },
      ];

      const Test: FC = () => {
        return (
          useMatches().match?.route?.elements._layout as Record<
            string,
            ReactElement
          >
        ).Main;
      };

      const screen = render(
        <MatchesProvider value={matches}>
          <MatchIndexProvider value={0}>
            <Test />
          </MatchIndexProvider>
        </MatchesProvider>,
        { wrapper },
      );

      await expect.element(screen.getByTestId(testId)).toBeVisible();

      expect(screen.container).toMatchSnapshot();
    });
  });

  describe("useMatch", () => {
    test("2 matches", async () => {
      const matches: Match[] = [
        {
          route: {
            path: "/",
            test: regexparam.parse("/", true),
            modules: [],
            loaded: true,
            elements: {
              _layout: {
                Main: <div>Page /</div>,
              },
            },
          },
          location: "/",
          params: {},
        },
        {
          route: {
            path: "/abc",
            test: regexparam.parse("/abc", true),
            modules: [],
            loaded: true,
            elements: {
              _layout: {
                Main: <div>Page /abc</div>,
              },
            },
          },
          location: "/abc",
          params: {},
        },
      ];

      const Test: FC = () => {
        return useMatch("/abc")?.route?.elements._layout?.Main;
      };

      const screen = render(
        <MatchesProvider value={matches}>
          <Test />
        </MatchesProvider>,
        { wrapper },
      );

      await expect.element(screen.getByTestId(testId)).toBeVisible();

      expect(screen.container).toMatchSnapshot();
    });
  });
});
