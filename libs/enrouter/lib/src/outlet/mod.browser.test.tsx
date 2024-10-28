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
  test("no match", async () => {
    const screen = render(
      <MatchProvider value={undefined}>
        <Outlet />
      </MatchProvider>,
      { wrapper },
    );

    await expect.element(screen.getByTestId(wrapperId)).toBeVisible();

    expect(screen.container).toMatchSnapshot();
  });

  test("default _layout element from next match", async () => {
    const match: Match = {
      isVoid: false,
      route: {
        path: "/",
        test: regexparam.parse("/", true),
        modules: [],
        loaded: true,
        elements: {
          _layout: <div>layout</div>,
          _content: <div>content</div>,
        },
      },
      location: "/",
      isFull: false,
      params: {},

      next: {
        isVoid: false,
        route: {
          path: "/abc",
          test: regexparam.parse("/abc", true),
          modules: [],
          loaded: true,
          elements: {
            _layout: <div>next layout</div>,
            _content: <div>next content</div>,
          },
        },
        location: "/abc",
        isFull: false,
        params: {},
      },
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
        },
      },
      location: "/",
      isFull: false,
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
          },
        },
        location: "/abc",
        isFull: false,
        params: {},
      },
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

  test("default _content element from current match", async () => {
    const match: Match = {
      isVoid: false,
      route: {
        path: "/",
        test: regexparam.parse("/", true),
        modules: [],
        loaded: true,
        elements: {
          _layout: <div>layout</div>,
          _content: <div>content</div>,
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
});
