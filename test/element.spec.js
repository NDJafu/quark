import { test, expect, describe } from "vitest";
import { quark } from "../index.js";

describe("Create components", () => {
  test("create simple component", () => {
    const node = quark({
      div: "Hi!",
    });

    const expectedNode = document.createElement("div");
    expectedNode.innerHTML = "Hi!";

    expect(node.outerHTML).toBe(expectedNode.outerHTML);
  });

  test("undefined on keys' value are replaced not shown", () => {
    const node = quark({
      div: undefined,
    });

    expect(node.innerHTML).toBe("");
  });
});
