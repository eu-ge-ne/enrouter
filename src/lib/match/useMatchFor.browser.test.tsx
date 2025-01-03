import type { FC, PropsWithChildren } from "react";
import { describe, test, expect } from "vitest";
import { render } from "vitest-browser-react";
import * as regexparam from "regexparam";

import type { Match } from "./match.js";
import { MatchesProvider } from "./context.js";
import { useMatchFor } from "./useMatchFor.js";

const testId = "test-wrapper";

const wrapper: FC<PropsWithChildren> = ({ children }) => (
  <div data-testid={testId}>{children}</div>
);

describe("match", () => {
  describe("useMatchFor", () => {
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
        return useMatchFor("/abc")?.route?.elements._layout?.Main;
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
