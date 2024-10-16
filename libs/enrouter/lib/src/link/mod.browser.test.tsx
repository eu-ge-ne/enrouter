import { describe, test, expect } from "vitest";
import { render } from "vitest-browser-react";

import { type TRouterContext, RouterContext } from "#lib/router/context.js";
import { useLinkProps } from "./mod.js";

const wrapperId = "test-wrapper";

describe("link", () => {
  test("useLinkProps", async () => {
    function TestLink() {
      const props = useLinkProps({ href: "/abc" });
      return <a {...props}>link to /abc</a>;
    }

    const context: TRouterContext = {
      routes: {
        path: "",
        test: { keys: [], pattern: new RegExp("") },
        modules: [],
        loaded: false,
        elements: {},
      },
      location: "/",
      navigate: () => undefined,
    };

    const screen = render(<TestLink />, {
      wrapper: ({ children }) => (
        <div data-testid={wrapperId}>
          <RouterContext.Provider value={context}>
            {children}
          </RouterContext.Provider>
        </div>
      ),
    });

    await expect.element(screen.getByTestId(wrapperId)).toBeVisible();
    expect(screen.container).toMatchSnapshot();
  });
});
