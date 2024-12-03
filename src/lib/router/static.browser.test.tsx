import type { FC, PropsWithChildren } from "react";
import { describe, test, expect } from "vitest";
import { render } from "vitest-browser-react";
import * as regexparam from "regexparam";

import type { Match } from "#lib/match/match.js";
import { StaticRouter } from "./static.js";

const testId = "test-wrapper";

const wrapper: FC<PropsWithChildren> = ({ children }) => (
  <div data-testid={testId}>{children}</div>
);

describe("router", () => {
  describe("StaticRouter", () => {
    test("root", async () => {
      const matches: Match[] = [
        {
          route: {
            path: "/",
            test: regexparam.parse("/", true),
            modules: [],
            loaded: true,
            elements: {
              _layout: {
                Root: <div>Root</div>,
              },
            },
          },
          location: "/",
          isExact: true,
          params: {},
        },
      ];

      const screen = render(<StaticRouter location="/" matches={matches} />, {
        wrapper,
      });

      await expect.element(screen.getByTestId(testId)).toBeVisible();

      expect(screen.container).toMatchSnapshot();
    });
  });
});
