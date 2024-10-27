import type { FC, PropsWithChildren } from "react";
import { describe, test, expect } from "vitest";
import { render } from "vitest-browser-react";
import * as regexparam from "regexparam";

import type { Match } from "#lib/match/mod.js";
import { MatchProvider } from "#lib/match/context.js";
import { Root } from "./root.js";

const wrapperId = "test-wrapper";

const wrapper: FC<PropsWithChildren> = ({ children }) => (
  <div data-testid={wrapperId}>{children}</div>
);

describe("router", () => {
  describe("Root", () => {
    test("_root", async () => {
      const match: Match = {
        isRoot: true,
        isVoid: false,
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

      match.first = match;
      match.last = match;

      const screen = render(
        <MatchProvider value={match}>
          <Root />
        </MatchProvider>,
        { wrapper },
      );

      await expect.element(screen.getByTestId(wrapperId)).toBeVisible();

      expect(screen.container).toMatchSnapshot();
    });
  });
});
