import { describe, test, expect } from "vitest";

import { helloWorld } from "./mod.js";

describe("mod", () => {
  test("helloWorld", async () => {
    expect(helloWorld()).toMatchSnapshot();
  });
});
