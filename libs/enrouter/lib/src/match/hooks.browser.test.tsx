import type { FC, PropsWithChildren } from "react";
import { describe, test, expect } from "vitest";
import { render } from "vitest-browser-react";
import * as regexparam from "regexparam";

import type { Match } from "./mod.js";
import { MatchProvider } from "./context.js";
import { usePath, useActive } from "./hooks.js";

const wrapperId = "test-wrapper";

const wrapper: FC<PropsWithChildren> = ({ children }) => (
  <div data-testid={wrapperId}>{children}</div>
);

describe("match", () => {
  describe("usePath", () => {
    test("with 2 matches", async () => {
      const context: Match = {
        route: {
          path: "/",
          test: regexparam.parse("/", true),
          modules: [],
          loaded: true,
          elements: {
            this: {
              Main: <div>Layout /</div>,
            },
          },
        },
        isFull: false,
        location: "/",
        params: {},

        next: {
          route: {
            path: "/abc",
            test: regexparam.parse("/abc", true),
            modules: [],
            loaded: true,
            elements: {
              this: {
                Main: <div>Layout /abc</div>,
              },
            },
          },
          isFull: true,
          location: "/abc",
          params: {},
        },
      };

      context.first = context;

      const Test: FC = () => {
        const match = usePath("/abc");
        return Object.values(match?.route.elements?.this ?? {});
      };

      const screen = render(
        <MatchProvider value={context}>
          <Test />
        </MatchProvider>,
        { wrapper },
      );

      await expect.element(screen.getByTestId(wrapperId)).toBeVisible();

      expect(screen.container).toMatchSnapshot();
    });
  });

  describe("useActive", () => {
    test("with 2 matches", async () => {
      const context: Match = {
        route: {
          path: "/",
          test: regexparam.parse("/", true),
          modules: [],
          loaded: true,
          elements: {
            this: {
              Main: <div>Layout /</div>,
            },
          },
        },
        isFull: false,
        location: "/",
        params: {},

        next: {
          route: {
            path: "/abc",
            test: regexparam.parse("/abc", true),
            modules: [],
            loaded: true,
            elements: {
              this: {
                Main: <div>Layout /abc</div>,
              },
            },
          },
          isFull: true,
          location: "/abc",
          params: {},
        },
      };

      context.first = context;

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
        <MatchProvider value={context}>
          <Test />
        </MatchProvider>,
        { wrapper },
      );

      await expect.element(screen.getByTestId(wrapperId)).toBeVisible();

      expect(screen.container).toMatchSnapshot();
    });
  });
});
