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
  test("root using _layout default element", async () => {
    const match: Match = {
      isRoot: false,
      isVoid: false,
      route: {
        path: "/",
        test: regexparam.parse("/", true),
        modules: [],
        loaded: true,
        elements: {
          _layout: <div>_layout</div>,
          _content: <div>_content</div>,
        },
      },
      location: "/",
      isFull: false,
      params: {},
    };

    const screen = render(
      <MatchProvider value={match}>
        <Outlet root />
      </MatchProvider>,
      { wrapper },
    );

    await expect.element(screen.getByTestId(wrapperId)).toBeVisible();

    expect(screen.container).toMatchSnapshot();
  });

  test("root using _layout named element", async () => {
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
            Main: <div>_layout#Main</div>,
          },
          _content: {
            Main: <div>_content#Main</div>,
          },
        },
      },
      location: "/",
      isFull: false,
      params: {},
    };

    const screen = render(
      <MatchProvider value={match}>
        <Outlet root name="Main" />
      </MatchProvider>,
      { wrapper },
    );

    await expect.element(screen.getByTestId(wrapperId)).toBeVisible();

    expect(screen.container).toMatchSnapshot();
  });

  test("root using _content default element", async () => {
    const match: Match = {
      isRoot: false,
      isVoid: false,
      route: {
        path: "/",
        test: regexparam.parse("/", true),
        modules: [],
        loaded: true,
        elements: {
          _content: <div>_content</div>,
        },
      },
      location: "/",
      isFull: false,
      params: {},
    };

    const screen = render(
      <MatchProvider value={match}>
        <Outlet root />
      </MatchProvider>,
      { wrapper },
    );

    await expect.element(screen.getByTestId(wrapperId)).toBeVisible();

    expect(screen.container).toMatchSnapshot();
  });

  test("root using _content named element", async () => {
    const match: Match = {
      isRoot: false,
      isVoid: false,
      route: {
        path: "/",
        test: regexparam.parse("/", true),
        modules: [],
        loaded: true,
        elements: {
          _content: {
            Main: <div>_content#Main</div>,
          },
        },
      },
      location: "/",
      isFull: false,
      params: {},
    };

    const screen = render(
      <MatchProvider value={match}>
        <Outlet root name="Main" />
      </MatchProvider>,
      { wrapper },
    );

    await expect.element(screen.getByTestId(wrapperId)).toBeVisible();

    expect(screen.container).toMatchSnapshot();
  });

  test("next using _layout default element", async () => {
    const match: Match = {
      isRoot: false,
      isVoid: false,
      route: {
        path: "/",
        test: regexparam.parse("/", true),
        modules: [],
        loaded: true,
        elements: {},
      },
      location: "/",
      isFull: false,
      params: {},

      next: {
        isRoot: false,
        isVoid: false,
        route: {
          path: "/abc",
          test: regexparam.parse("/abc", true),
          modules: [],
          loaded: true,
          elements: {
            _layout: <div>_layout</div>,
            _content: <div>_content</div>,
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

  test("next using _layout named element", async () => {
    const match: Match = {
      isRoot: false,
      isVoid: false,
      route: {
        path: "/",
        test: regexparam.parse("/", true),
        modules: [],
        loaded: true,
        elements: {},
      },
      location: "/",
      isFull: false,
      params: {},

      next: {
        isRoot: false,
        isVoid: false,
        route: {
          path: "/abc",
          test: regexparam.parse("/abc", true),
          modules: [],
          loaded: true,
          elements: {
            _layout: {
              Main: <div>_layout#Main</div>,
            },
            _content: {
              Main: <div>_content#Main</div>,
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

  test("next using _content default element", async () => {
    const match: Match = {
      isRoot: false,
      isVoid: false,
      route: {
        path: "/",
        test: regexparam.parse("/", true),
        modules: [],
        loaded: true,
        elements: {},
      },
      location: "/",
      isFull: false,
      params: {},

      next: {
        isRoot: false,
        isVoid: false,
        route: {
          path: "/abc",
          test: regexparam.parse("/abc", true),
          modules: [],
          loaded: true,
          elements: {
            _content: <div>_content</div>,
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

  test("next using _content named element", async () => {
    const match: Match = {
      isRoot: false,
      isVoid: false,
      route: {
        path: "/",
        test: regexparam.parse("/", true),
        modules: [],
        loaded: true,
        elements: {},
      },
      location: "/",
      isFull: false,
      params: {},

      next: {
        isRoot: false,
        isVoid: false,
        route: {
          path: "/abc",
          test: regexparam.parse("/abc", true),
          modules: [],
          loaded: true,
          elements: {
            _content: {
              Main: <div>_content#Main</div>,
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

  /*
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
  */
});
