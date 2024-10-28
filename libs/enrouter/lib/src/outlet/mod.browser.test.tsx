import type { FC, PropsWithChildren, ReactElement } from "react";
import { describe, test, expect } from "vitest";
import { render } from "vitest-browser-react";
import * as regexparam from "regexparam";

import type { Match } from "#lib/match/mod.js";
import { MatchProvider } from "#lib/match/context.js";
import { Outlet } from "./mod.js";

const wrapperId = "test-wrapper";

const wrapper: FC<PropsWithChildren> = ({ children }) => (
  <div data-testid={wrapperId}>{children}</div>
);

describe("outlet", () => {
  test("using _void elements", async () => {
    const match: Match = {
      isRoot: false,
      isVoid: true,
      route: {
        path: "/",
        test: regexparam.parse("/", true),
        modules: [],
        loaded: true,
        elements: {
          _void: {
            Main: <div>_void</div>,
          },
        },
      },
      location: "/",
      isFull: false,
      params: {},
    };

    const screen = render(
      <MatchProvider value={match}>
        <Outlet name="Main" />
      </MatchProvider>,
      { wrapper },
    );

    await expect.element(screen.getByTestId(wrapperId)).toBeVisible();

    expect(screen.container).toMatchSnapshot();
  });

  test("using _void element", async () => {
    const match: Match = {
      isRoot: false,
      isVoid: true,
      route: {
        path: "/",
        test: regexparam.parse("/", true),
        modules: [],
        loaded: true,
        elements: {
          _void: <div>_void</div>,
        },
      },
      location: "/",
      isFull: false,
      params: {},
    };

    const screen = render(
      <MatchProvider value={match}>
        <Outlet />
      </MatchProvider>,
      { wrapper },
    );

    await expect.element(screen.getByTestId(wrapperId)).toBeVisible();

    expect(screen.container).toMatchSnapshot();
  });

  test("using _index elements", async () => {
    const match: Match = {
      isRoot: false,
      isVoid: false,
      route: {
        path: "/",
        test: regexparam.parse("/", true),
        modules: [],
        loaded: true,
        elements: {
          _layout: {
            Main: (
              <div>
                <div>_layout</div>
                <Outlet name="Next" />
              </div>
            ),
          },
          _index: {
            Next: <div>Next#_index</div>,
          },
        },
      },
      location: "/",
      isFull: true,
      params: {},
    };

    const screen = render(
      <MatchProvider value={match}>
        {(match.route.elements._layout as Record<string, ReactElement>).Main}
      </MatchProvider>,
      { wrapper },
    );

    await expect.element(screen.getByTestId(wrapperId)).toBeVisible();

    expect(screen.container).toMatchSnapshot();
  });

  test("using _index element", async () => {
    const match: Match = {
      isRoot: false,
      isVoid: false,
      route: {
        path: "/",
        test: regexparam.parse("/", true),
        modules: [],
        loaded: true,
        elements: {
          _layout: {
            Main: (
              <div>
                <div>_layout</div>
                <Outlet />
              </div>
            ),
          },
          _index: <div>_index</div>,
        },
      },
      location: "/",
      isFull: true,
      params: {},
    };

    const screen = render(
      <MatchProvider value={match}>
        {(match.route.elements._layout as Record<string, ReactElement>).Main}
      </MatchProvider>,
      { wrapper },
    );

    await expect.element(screen.getByTestId(wrapperId)).toBeVisible();

    expect(screen.container).toMatchSnapshot();
  });

  test("using _layout elements", async () => {
    const match: Match = {
      isRoot: false,
      isVoid: false,
      route: {
        path: "/",
        test: regexparam.parse("/", true),
        modules: [],
        loaded: true,
        elements: {
          _layout: {
            Main: (
              <div>
                <div>_layout</div>
                <Outlet name="Next" />
              </div>
            ),
          },
        },
      },
      location: "/",
      isFull: false,
      params: {},

      next: {
        isRoot: false,
        isVoid: false,
        route: {
          path: "/a",
          test: regexparam.parse("/a", true),
          modules: [],
          loaded: true,
          elements: {
            _layout: {
              Next: (
                <div>
                  <div>Next#_layout</div>
                </div>
              ),
            },
          },
        },
        location: "/a",
        isFull: true,
        params: {},
      },
    };

    const screen = render(
      <MatchProvider value={match}>
        {(match.route.elements._layout as Record<string, ReactElement>).Main}
      </MatchProvider>,
      { wrapper },
    );

    await expect.element(screen.getByTestId(wrapperId)).toBeVisible();

    expect(screen.container).toMatchSnapshot();
  });

  test("using _layout element", async () => {
    const match: Match = {
      isRoot: false,
      isVoid: false,
      route: {
        path: "/",
        test: regexparam.parse("/", true),
        modules: [],
        loaded: true,
        elements: {
          _layout: {
            Main: (
              <div>
                <div>_layout</div>
                <Outlet />
              </div>
            ),
          },
        },
      },
      location: "/",
      isFull: false,
      params: {},

      next: {
        isRoot: false,
        isVoid: false,
        route: {
          path: "/a",
          test: regexparam.parse("/a", true),
          modules: [],
          loaded: true,
          elements: {
            _layout: (
              <div>
                <div>_layout</div>
              </div>
            ),
          },
        },
        location: "/a",
        isFull: true,
        params: {},
      },
    };

    const screen = render(
      <MatchProvider value={match}>
        {(match.route.elements._layout as Record<string, ReactElement>).Main}
      </MatchProvider>,
      { wrapper },
    );

    await expect.element(screen.getByTestId(wrapperId)).toBeVisible();

    expect(screen.container).toMatchSnapshot();
  });

  test("root using _layout elements", async () => {
    const match: Match = {
      isRoot: false,
      isVoid: false,
      route: {
        path: "/",
        test: regexparam.parse("/", true),
        modules: [],
        loaded: true,
        elements: {
          _root: (
            <div>
              <div>_root</div>
              <Outlet root name="Main" />
            </div>
          ),
          _layout: {
            Main: <div>Main#_layout</div>,
          },
        },
      },
      location: "/",
      isFull: true,
      params: {},
    };

    const screen = render(
      <MatchProvider value={match}>{match.route.elements._root}</MatchProvider>,
      { wrapper },
    );

    await expect.element(screen.getByTestId(wrapperId)).toBeVisible();

    expect(screen.container).toMatchSnapshot();
  });

  test("root using _layout element", async () => {
    const match: Match = {
      isRoot: false,
      isVoid: false,
      route: {
        path: "/",
        test: regexparam.parse("/", true),
        modules: [],
        loaded: true,
        elements: {
          _root: (
            <div>
              <div>_root</div>
              <Outlet root />
            </div>
          ),
          _layout: <div>_layout</div>,
        },
      },
      location: "/",
      isFull: true,
      params: {},
    };

    const screen = render(
      <MatchProvider value={match}>{match.route.elements._root}</MatchProvider>,
      { wrapper },
    );

    await expect.element(screen.getByTestId(wrapperId)).toBeVisible();

    expect(screen.container).toMatchSnapshot();
  });
});
