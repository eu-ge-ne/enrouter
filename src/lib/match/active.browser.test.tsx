import type { FC, PropsWithChildren } from "react";
import { describe, test, expect } from "vitest";
import { render } from "vitest-browser-react";
import * as regexparam from "regexparam";

import type { Match } from "./match.js";
import { MatchesProvider } from "./context.js";
import { useActive } from "./active.js";

const testId = "test-wrapper";

const wrapper: FC<PropsWithChildren> = ({ children }) => (
  <div data-testid={testId}>{children}</div>
);

describe("match", () => {
  describe("useActive", () => {
    test("with 2 matches", async () => {
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
          isExact: false,
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
          isExact: true,
          location: "/abc",
          params: {},
        },
      ];

      const Test: FC = () => {
        const match1 = useActive({
          path: "/",
          value: ["/ is active", "/ is not active"],
        });
        const match2 = useActive({
          path: "/abc",
          value: ["/abc is active", "/abc is not active"],
        });
        const match3 = useActive({
          path: "/",
          loose: true,
          value: ["/ is active (loose)", "/ is not active (loose)"],
        });
        const match4 = useActive({
          path: "/xyz",
          value: ["/xyz is active", "/xyz is not active"],
        });

        return (
          <div>
            <p>{match1}</p>
            <p>{match2}</p>
            <p>{match3}</p>
            <p>{match4}</p>
          </div>
        );
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
