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
  test('using "_void" elements', async () => {
    const match: Match = {
      route: {
        path: "/",
        test: regexparam.parse("/", true),
        modules: [],
        loaded: true,
        elements: {
          _page: {
            Main: (
              <div>
                <div>_page</div>
                <Outlet name="Next" />
              </div>
            ),
          },
          _void: {
            Next: <div>Next#_void</div>,
          },
        },
      },
      location: "/",
      full: false,
      params: {},
    };

    const screen = render(
      <MatchProvider value={match}>
        {(match.route.elements._page as Record<string, ReactElement>).Main}
      </MatchProvider>,
      { wrapper },
    );

    await expect.element(screen.getByTestId(wrapperId)).toBeVisible();

    expect(screen.container).toMatchSnapshot();
  });

  test('using "_void" element', async () => {
    const match: Match = {
      route: {
        path: "/",
        test: regexparam.parse("/", true),
        modules: [],
        loaded: true,
        elements: {
          _page: {
            Main: (
              <div>
                <div>_page</div>
                <Outlet />
              </div>
            ),
          },
          _void: <div>_void</div>,
        },
      },
      location: "/",
      full: false,
      params: {},
    };

    const screen = render(
      <MatchProvider value={match}>
        {(match.route.elements._page as Record<string, ReactElement>).Main}
      </MatchProvider>,
      { wrapper },
    );

    await expect.element(screen.getByTestId(wrapperId)).toBeVisible();

    expect(screen.container).toMatchSnapshot();
  });

  test(`using "_index" elements`, async () => {
    const match: Match = {
      route: {
        path: "/",
        test: regexparam.parse("/", true),
        modules: [],
        loaded: true,
        elements: {
          _page: {
            Main: (
              <div>
                <div>_page</div>
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
      full: true,
      params: {},
    };

    const screen = render(
      <MatchProvider value={match}>
        {(match.route.elements._page as Record<string, ReactElement>).Main}
      </MatchProvider>,
      { wrapper },
    );

    await expect.element(screen.getByTestId(wrapperId)).toBeVisible();

    expect(screen.container).toMatchSnapshot();
  });

  test(`using "_index" element`, async () => {
    const match: Match = {
      route: {
        path: "/",
        test: regexparam.parse("/", true),
        modules: [],
        loaded: true,
        elements: {
          _page: {
            Main: (
              <div>
                <div>_page</div>
                <Outlet />
              </div>
            ),
          },
          _index: <div>_index</div>,
        },
      },
      location: "/",
      full: true,
      params: {},
    };

    const screen = render(
      <MatchProvider value={match}>
        {(match.route.elements._page as Record<string, ReactElement>).Main}
      </MatchProvider>,
      { wrapper },
    );

    await expect.element(screen.getByTestId(wrapperId)).toBeVisible();

    expect(screen.container).toMatchSnapshot();
  });

  test(`using "_page" elements`, async () => {
    const match: Match = {
      route: {
        path: "/",
        test: regexparam.parse("/", true),
        modules: [],
        loaded: true,
        elements: {
          _page: {
            Main: (
              <div>
                <div>_page</div>
                <Outlet name="Next" />
              </div>
            ),
          },
        },
      },
      location: "/",
      full: false,
      params: {},
      next: {
        route: {
          path: "/a",
          test: regexparam.parse("/a", true),
          modules: [],
          loaded: true,
          elements: {
            _page: {
              Next: (
                <div>
                  <div>Next#_page</div>
                </div>
              ),
            },
          },
        },
        location: "/a",
        full: true,
        params: {},
      },
    };

    const screen = render(
      <MatchProvider value={match}>
        {(match.route.elements._page as Record<string, ReactElement>).Main}
      </MatchProvider>,
      { wrapper },
    );

    await expect.element(screen.getByTestId(wrapperId)).toBeVisible();

    expect(screen.container).toMatchSnapshot();
  });

  test(`using "_page" element`, async () => {
    const match: Match = {
      route: {
        path: "/",
        test: regexparam.parse("/", true),
        modules: [],
        loaded: true,
        elements: {
          _page: {
            Main: (
              <div>
                <div>_page</div>
                <Outlet />
              </div>
            ),
          },
        },
      },
      location: "/",
      full: false,
      params: {},
      next: {
        route: {
          path: "/a",
          test: regexparam.parse("/a", true),
          modules: [],
          loaded: true,
          elements: {
            _page: (
              <div>
                <div>_page</div>
              </div>
            ),
          },
        },
        location: "/a",
        full: true,
        params: {},
      },
    };

    const screen = render(
      <MatchProvider value={match}>
        {(match.route.elements._page as Record<string, ReactElement>).Main}
      </MatchProvider>,
      { wrapper },
    );

    await expect.element(screen.getByTestId(wrapperId)).toBeVisible();

    expect(screen.container).toMatchSnapshot();
  });

  test(`using here "_page" elements`, async () => {
    const match: Match = {
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
          _page: {
            Main: <div>Main#_page</div>,
          },
        },
      },
      location: "/",
      full: true,
      params: {},
    };

    const screen = render(
      <MatchProvider value={match}>{match.route.elements._root}</MatchProvider>,
      { wrapper },
    );

    await expect.element(screen.getByTestId(wrapperId)).toBeVisible();

    expect(screen.container).toMatchSnapshot();
  });

  test(`using here "_page" element`, async () => {
    const match: Match = {
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
          _page: <div>_page</div>,
        },
      },
      location: "/",
      full: true,
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
