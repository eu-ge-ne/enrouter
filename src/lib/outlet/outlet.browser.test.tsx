import type { FC, PropsWithChildren } from "react";
import { describe, test, expect } from "vitest";
import { render } from "vitest-browser-react";
import * as regexparam from "regexparam";

import type { Match } from "#lib/match/match.js";
import { MatchesProvider, MatchIndexProvider } from "#lib/match/context.js";
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

  test("named _layout element from next match", async () => {
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
            _content: {
              Main: <div>content#Main</div>,
            },
            _void: {
              Main: <div>void#Main</div>,
            },
          },
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
            _content: {
              Main: <div>next content#Main</div>,
            },
            _void: {
              Main: <div>next void#Main</div>,
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

  test("named _content element from next match", async () => {
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
            _content: {
              Main: <div>content#Main</div>,
            },
          },
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

  test("named _content element from current match", async () => {
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

  test("named _void element from current match", async () => {
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
            _content: {
              Main: <div>content#Main</div>,
            },
            _void: {
              Main: <div>void#Main</div>,
            },
          },
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
});
