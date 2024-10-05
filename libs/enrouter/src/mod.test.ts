import { describe, test, expect } from "vitest";

import { hello } from "./mod.js";

describe("enrouter", () => {
  test("hello", async () => {
    expect(hello()).toMatchSnapshot();
  });
});
