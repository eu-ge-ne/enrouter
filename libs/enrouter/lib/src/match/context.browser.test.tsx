import type { FC, PropsWithChildren } from "react";
import { describe, test, expect } from "vitest";
import { render } from "vitest-browser-react";
import * as regexparam from "regexparam";

import type { Match } from "./mod.js";
import { MatchProvider, useMatch } from "./context.js";

const wrapperId = "test-wrapper";

const wrapper: FC<PropsWithChildren> = ({ children }) => (
  <div data-testid={wrapperId}>{children}</div>
);

describe("match", () => {
  describe("useMatch", () => {
    test("1 match", async () => {
      const context: Match = {
        route: {
          path: "/",
          test: regexparam.parse("/", true),
          modules: [],
          loaded: true,
          elements: {},
        },
        isFull: true,
        location: "/",
        params: {},
        elements: {
          layout: {
            Main: <div>Layout /</div>,
          },
        },
      };

      const Test: FC = () => {
        const match = useMatch();
        return Object.values(match.elements?.layout ?? {});
      };

      const screen = render(
        <MatchProvider value={context}>
          <Test />
        </MatchProvider>,
        {
          wrapper,
        },
      );

      await expect.element(screen.getByTestId(wrapperId)).toBeVisible();

      expect(screen.container).toMatchSnapshot();
    });
  });
});