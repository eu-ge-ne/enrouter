import type { FC, PropsWithChildren } from "react";
import { describe, test, expect } from "vitest";
import { render } from "vitest-browser-react";

import { LocationProvider, useLocation } from "./mod.js";

const wrapperId = "test-wrapper";

const wrapper: FC<PropsWithChildren> = ({ children }) => (
  <div data-testid={wrapperId}>{children}</div>
);

describe("location", () => {
  test("useLocation", async () => {
    function Test() {
      const location = useLocation();
      return <div>{location}</div>;
    }

    const screen = render(
      <LocationProvider value="/abc">
        <Test />
      </LocationProvider>,
      {
        wrapper,
      },
    );

    await expect.element(screen.getByTestId(wrapperId)).toBeVisible();

    expect(screen.container).toMatchSnapshot();
  });
});
