import type { FC, PropsWithChildren } from "react";
import { describe, test, expect, vi } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "@vitest/browser/context";

import { NavigateProvider, noNavigate } from "#lib/navigate/navigate.js";
import { useLink } from "./link.js";

const testId = "test-wrapper";

const wrapper: FC<PropsWithChildren> = ({ children }) => (
  <div data-testid={testId}>{children}</div>
);

describe("link", () => {
  test("useLink", async () => {
    function TestLink() {
      const props = useLink("/abc");
      return <a {...props}>link to /abc</a>;
    }

    const screen = render(
      <NavigateProvider value={noNavigate}>
        <TestLink />
      </NavigateProvider>,
      { wrapper },
    );

    await expect.element(screen.getByTestId(testId)).toBeVisible();

    expect(screen.container).toMatchSnapshot();
  });

  test("click", async () => {
    const navigate = vi.fn();

    function TestLink() {
      const props = useLink("/abc");
      return <a {...props}>link to /abc</a>;
    }

    const screen = render(
      <NavigateProvider value={navigate}>
        <TestLink />
      </NavigateProvider>,
      { wrapper },
    );

    await userEvent.click(screen.getByRole("link"));

    expect(navigate).toBeCalledTimes(1);
    expect(navigate).toBeCalledWith("/abc");
  });
});
