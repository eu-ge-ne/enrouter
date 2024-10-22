import { type FC, type PropsWithChildren, useEffect } from "react";
import { describe, test, expect, vi } from "vitest";
import { render } from "vitest-browser-react";

import { NavigateProvider, noNavigate } from "#lib/navigate/mod.js";

const wrapperId = "test-wrapper";

const wrapper: FC<PropsWithChildren> = ({ children }) => (
  <div data-testid={wrapperId}>{children}</div>
);

describe("navigate", () => {
  test("useNavigate", async () => {
    const navigate = vi.fn();

    function Test() {
      useEffect(() => {
        navigate("/abc");
      }, []);

      return null;
    }

    render(
      <NavigateProvider value={noNavigate}>
        <Test />
      </NavigateProvider>,
      { wrapper },
    );

    expect(navigate).toBeCalledTimes(1);
    expect(navigate).toBeCalledWith("/abc");
  });
});
