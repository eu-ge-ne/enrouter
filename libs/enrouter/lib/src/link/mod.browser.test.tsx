import { describe, test, expect } from "vitest";
import { render } from "vitest-browser-react";

import {
  type TRouterStaticContext,
  RouterStaticProvider,
} from "#lib/router/context.js";
import { useLink } from "./mod.js";

const wrapperId = "test-wrapper";

describe("link", () => {
  test("useLink", async () => {
    function TestLink() {
      const props = useLink("/abc");
      return <a {...props}>link to /abc</a>;
    }

    const context: TRouterStaticContext = {
      routes: {
        path: "",
        test: { keys: [], pattern: new RegExp("") },
        modules: [],
        loaded: false,
        elements: {},
      },
      navigate: () => {},
    };

    const screen = render(<TestLink />, {
      wrapper: ({ children }) => (
        <div data-testid={wrapperId}>
          <RouterStaticProvider value={context}>
            {children}
          </RouterStaticProvider>
        </div>
      ),
    });

    await expect.element(screen.getByTestId(wrapperId)).toBeVisible();
    expect(screen.container).toMatchSnapshot();
  });
});
