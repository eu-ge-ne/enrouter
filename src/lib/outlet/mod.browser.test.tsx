import type { FC, PropsWithChildren } from "react";
import { describe, test, expect } from "vitest";
import { render } from "vitest-browser-react";
import * as regexparam from "regexparam";

import type { Match } from "#lib/match/mod.js";
import { MatchProvider } from "#lib/match/context.js";
import { Outlet } from "./mod.js";

const TEST_ID = "test-wrapper";

const wrapper: FC<PropsWithChildren> = ({ children }) => (
  <div data-testid={TEST_ID}>{children}</div>
);

describe("outlet", () => {
  test("no match", async () => {
    const screen = render(
      <MatchProvider value={undefined}>
        <Outlet />
      </MatchProvider>,
      { wrapper }
    );

    await expect.element(screen.getByTestId(TEST_ID)).toBeVisible();

    expect(screen.container).toMatchSnapshot();
  });

  test("named _layout element from next match", async () => {
    const match: Match = {
      isVoid: false,
      route: {
        path: "/",
        test: regexparam.parse("/", true),
        modules: [],
        loaded: true,
        elements: {
          _layout: {
            Main: <div>layout#Main</div>,
          },
          _content: {
            Main: <div>content#Main</div>,
          },
          _void: {
            Main: <div>void#Main</div>,
          },
        },
      },
      location: "/",
      isExact: false,
      params: {},

      next: {
        isVoid: false,
        route: {
          path: "/abc",
          test: regexparam.parse("/abc", true),
          modules: [],
          loaded: true,
          elements: {
            _layout: {
              Main: <div>next layout#Main</div>,
            },
            _content: {
              Main: <div>next content#Main</div>,
            },
            _void: {
              Main: <div>next void#Main</div>,
            },
          },
        },
        location: "/abc",
        isExact: true,
        params: {},
      },
    };

    match.last = match.next;
    match.next!.last = match.next;

    const screen = render(
      <MatchProvider value={match}>
        <Outlet name="Main" />
      </MatchProvider>,
      { wrapper }
    );

    await expect.element(screen.getByTestId(TEST_ID)).toBeVisible();

    expect(screen.container).toMatchSnapshot();
  });

  test("named _content element from next match", async () => {
    const match: Match = {
      isVoid: false,
      route: {
        path: "/",
        test: regexparam.parse("/", true),
        modules: [],
        loaded: true,
        elements: {
          _layout: {
            Main: <div>layout#Main</div>,
          },
          _content: {
            Main: <div>content#Main</div>,
          },
        },
      },
      location: "/",
      isExact: false,
      params: {},

      next: {
        isVoid: false,
        route: {
          path: "/abc",
          test: regexparam.parse("/abc", true),
          modules: [],
          loaded: true,
          elements: {
            _content: {
              Main: <div>next content#Main</div>,
            },
          },
        },
        location: "/abc",
        isExact: true,
        params: {},
      },
    };

    match.last = match.next;
    match.next!.last = match.next;

    const screen = render(
      <MatchProvider value={match}>
        <Outlet name="Main" />
      </MatchProvider>,
      { wrapper }
    );

    await expect.element(screen.getByTestId(TEST_ID)).toBeVisible();

    expect(screen.container).toMatchSnapshot();
  });

  test("named _content element from current match", async () => {
    const match: Match = {
      isVoid: false,
      route: {
        path: "/",
        test: regexparam.parse("/", true),
        modules: [],
        loaded: true,
        elements: {
          _layout: {
            Main: <div>layout#Main</div>,
          },
          _content: {
            Main: <div>content#Main</div>,
          },
        },
      },
      location: "/",
      isExact: true,
      params: {},
    };

    match.last = match;

    const screen = render(
      <MatchProvider value={match}>
        <Outlet name="Main" />
      </MatchProvider>,
      { wrapper }
    );

    await expect.element(screen.getByTestId(TEST_ID)).toBeVisible();

    expect(screen.container).toMatchSnapshot();
  });

  test("named _void element from current match", async () => {
    const match: Match = {
      isVoid: true,
      route: {
        path: "/",
        test: regexparam.parse("/", true),
        modules: [],
        loaded: true,
        elements: {
          _layout: {
            Main: <div>layout#Main</div>,
          },
          _content: {
            Main: <div>content#Main</div>,
          },
          _void: {
            Main: <div>void#Main</div>,
          },
        },
      },
      location: "/",
      isExact: false,
      params: {},

      next: {
        isVoid: false,
        route: {
          path: "/abc",
          test: regexparam.parse("/abc", true),
          modules: [],
          loaded: true,
          elements: {
            _layout: {
              Main: <div>next layout#Main</div>,
            },
            _content: {
              Main: <div>next content#Main</div>,
            },
            _void: {
              Main: <div>next void#Main</div>,
            },
          },
        },
        location: "/abc",
        isExact: false,
        params: {},
      },
    };

    const screen = render(
      <MatchProvider value={match}>
        <Outlet name="Main" />
      </MatchProvider>,
      { wrapper }
    );

    await expect.element(screen.getByTestId(TEST_ID)).toBeVisible();

    expect(screen.container).toMatchSnapshot();
  });
});
