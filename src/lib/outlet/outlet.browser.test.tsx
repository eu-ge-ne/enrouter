import type { FC, PropsWithChildren } from "react";
import { describe, test, expect } from "vitest";
import { render } from "vitest-browser-react";
import * as regexparam from "regexparam";

import type { Match } from "#lib/match/match.js";
import { MatchesProvider, MatchIndexProvider } from "#lib/match/context.js";
import { type RootParams, RootParamsProvider } from "#lib/root/context.js";
import { Outlet } from "./outlet.js";

const testId = "test-wrapper";

const wrapper: FC<PropsWithChildren> = ({ children }) => (
  <div data-testid={testId}>{children}</div>
);

describe("outlet", () => {
  test("no match", async () => {
    const screen = render(
      <MatchesProvider value={[]}>
        <Outlet />
      </MatchesProvider>,
      { wrapper },
    );

    await expect.element(screen.getByTestId(testId)).toBeVisible();

    expect(screen.container).toMatchSnapshot();
  });

  test("_layout from next match", async () => {
    const matches: Match[] = [
      {
        route: {
          path: "/",
          test: regexparam.parse("/", true),
          modules: [],
          loaded: true,
          elements: {},
        },
        location: "/",
        params: {},
      },
      {
        route: {
          path: "/abc",
          test: regexparam.parse("/abc", true),
          modules: [],
          loaded: true,
          elements: {
            _layout: {
              Main: <div>next layout#Main</div>,
            },
          },
        },
        location: "/abc",
        params: {},
      },
    ];

    const screen = render(
      <MatchesProvider value={matches}>
        <MatchIndexProvider value={0}>
          <Outlet name="Main" />
        </MatchIndexProvider>
      </MatchesProvider>,
      { wrapper },
    );

    await expect.element(screen.getByTestId(testId)).toBeVisible();

    expect(screen.container).toMatchSnapshot();
  });

  test("_content from next match", async () => {
    const matches: Match[] = [
      {
        route: {
          path: "/",
          test: regexparam.parse("/", true),
          modules: [],
          loaded: true,
          elements: {},
        },
        location: "/",
        params: {},
      },
      {
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
        params: {},
      },
    ];

    const screen = render(
      <MatchesProvider value={matches}>
        <MatchIndexProvider value={0}>
          <Outlet name="Main" />
        </MatchIndexProvider>
      </MatchesProvider>,
      { wrapper },
    );

    await expect.element(screen.getByTestId(testId)).toBeVisible();

    expect(screen.container).toMatchSnapshot();
  });

  test("_content from current match", async () => {
    const matches: Match[] = [
      {
        route: {
          path: "/",
          test: regexparam.parse("/", true),
          modules: [],
          loaded: true,
          elements: {
            _content: {
              Main: <div>content#Main</div>,
            },
          },
        },
        location: "/",
        params: {},
      },
    ];

    const screen = render(
      <MatchesProvider value={matches}>
        <MatchIndexProvider value={0}>
          <Outlet name="Main" />
        </MatchIndexProvider>
      </MatchesProvider>,
      { wrapper },
    );

    await expect.element(screen.getByTestId(testId)).toBeVisible();

    expect(screen.container).toMatchSnapshot();
  });

  test("_fallback from current match", async () => {
    const matches: Match[] = [
      {
        route: {
          path: "/",
          test: regexparam.parse("/", true),
          modules: [],
          loaded: true,
          elements: {
            _fallback: {
              Main: <div>fallback#Main</div>,
            },
          },
        },
        location: "/",
        params: {},
      },
      {
        location: "/abc",
        params: {},
      },
    ];

    const screen = render(
      <MatchesProvider value={matches}>
        <MatchIndexProvider value={0}>
          <Outlet name="Main" />
        </MatchIndexProvider>
      </MatchesProvider>,
      { wrapper },
    );

    await expect.element(screen.getByTestId(testId)).toBeVisible();

    expect(screen.container).toMatchSnapshot();
  });

  test("_layout from first match", async () => {
    const matches: Match[] = [
      {
        route: {
          path: "/",
          test: regexparam.parse("/", true),
          modules: [],
          loaded: true,
          elements: {
            _layout: {
              Main: <div>layout#Main</div>,
            },
          },
        },
        location: "/",
        params: {},
      },
    ];

    const screen = render(
      <MatchesProvider value={matches}>
        <Outlet />
      </MatchesProvider>,
      { wrapper },
    );

    await expect.element(screen.getByTestId(testId)).toBeVisible();

    expect(screen.container).toMatchSnapshot();
  });

  test("_content from first match", async () => {
    const matches: Match[] = [
      {
        route: {
          path: "/",
          test: regexparam.parse("/", true),
          modules: [],
          loaded: true,
          elements: {
            _content: {
              Main: <div>content#Main</div>,
            },
          },
        },
        location: "/",
        params: {},
      },
    ];

    const screen = render(
      <MatchesProvider value={matches}>
        <Outlet />
      </MatchesProvider>,
      { wrapper },
    );

    await expect.element(screen.getByTestId(testId)).toBeVisible();

    expect(screen.container).toMatchSnapshot();
  });

  test("root fallback", async () => {
    const rootParams: RootParams = {
      fallback: {
        X: () => <div>fallback</div>,
      },
    };

    const matches: Match[] = [
      {
        route: {
          path: "/",
          test: regexparam.parse("/", true),
          modules: [],
          loaded: true,
          elements: {},
        },
        location: "/",
        params: {},
      },
      {
        location: "/x",
        params: {},
      },
    ];

    const screen = render(
      <RootParamsProvider value={rootParams}>
        <MatchesProvider value={matches}>
          <Outlet />
        </MatchesProvider>
      </RootParamsProvider>,
      { wrapper },
    );

    await expect.element(screen.getByTestId(testId)).toBeVisible();

    expect(screen.container).toMatchSnapshot();
  });

  test("named root fallback", async () => {
    const rootParams: RootParams = {
      fallback: {
        A: () => <div>fallback A</div>,
      },
    };

    const matches: Match[] = [
      {
        route: {
          path: "/",
          test: regexparam.parse("/", true),
          modules: [],
          loaded: true,
          elements: {},
        },
        location: "/",
        params: {},
      },
      {
        location: "/x",
        params: {},
      },
    ];

    const screen = render(
      <RootParamsProvider value={rootParams}>
        <MatchesProvider value={matches}>
          <Outlet name="A" />
        </MatchesProvider>
      </RootParamsProvider>,
      { wrapper },
    );

    await expect.element(screen.getByTestId(testId)).toBeVisible();

    expect(screen.container).toMatchSnapshot();
  });
});
