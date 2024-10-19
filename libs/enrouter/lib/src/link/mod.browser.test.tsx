import type { FC, PropsWithChildren } from "react";
import { describe, test, expect } from "vitest";
import { render } from "vitest-browser-react";

import {
  type TRouterStaticContext,
  RouterStaticProvider,
} from "#lib/router/context.js";
import { useLink } from "./mod.js";

const wrapperId = "test-wrapper";

const wrapper: FC<PropsWithChildren> = ({ children }) => (
  <div data-testid={wrapperId}>{children}</div>
);

describe("link", () => {
  test("useLink", async () => {
    function TestLink() {
      const props = useLink("/abc");
      return <a {...props}>link to /abc</a>;
    }

    const context: TRouterStaticContext = {
      navigate: () => {},
    };

    const screen = render(
      <RouterStaticProvider value={context}>
        <TestLink />
      </RouterStaticProvider>,
      { wrapper },
    );

    await expect.element(screen.getByTestId(wrapperId)).toBeVisible();

    expect(screen.container).toMatchSnapshot();
  });
});
