import { describe, test, expect } from "vitest";
import * as regexparam from "regexparam";

import type { Match } from "./mod.js";
import { load } from "./load.js";

describe("match", () => {
  describe("load", () => {
    test("0 matches", async () => {
      const matches: Match[] = [];

      await load(matches);

      expect(matches).toMatchSnapshot();
    });

    test("1 match", async () => {
      const matches: Match[] = [
        {
          route: {
            path: "/",
            test: regexparam.parse("/", true),
            modules: [],
            loaded: true,
            elements: {
              layout: {
                Main: <div>Layout</div>,
              },
            },
          },
          isFull: true,
          location: "/",
          params: {},
        },
      ];
      matches[0]!.fist = matches[0];

      await load(matches);

      expect(matches).toMatchSnapshot();
    });
  });
});
