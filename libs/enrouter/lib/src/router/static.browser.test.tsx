import type { FC, PropsWithChildren } from "react";
import { describe, test, expect } from "vitest";
import { render } from "vitest-browser-react";
import * as regexparam from "regexparam";

import type { Match } from "#lib/match/mod.js";
import { Static } from "./static.js";

const wrapperId = "test-wrapper";

const wrapper: FC<PropsWithChildren> = ({ children }) => (
  <div data-testid={wrapperId}>{children}</div>
);

describe("router", () => {
  describe("Static", () => {
    test("root", async () => {
      const match: Match = {
        route: {
          path: "/",
          test: regexparam.parse("/", true),
          modules: [],
          loaded: true,
          elements: {
            _root: <div>Root</div>,
          },
        },
        location: "/",
        isFull: true,
        params: {},
      };

      const screen = render(<Static location="/" match={match} />, {
        wrapper,
      });

      await expect.element(screen.getByTestId(wrapperId)).toBeVisible();

      expect(screen.container).toMatchSnapshot();
    });
  });
});
