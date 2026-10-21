import { describe, expect, it } from "vitest";

import { formatPkr, formatPkrMinor } from "./format";

describe("formatPkr", () => {
  it("formats whole rupees for existing storefront copy", () => {
    expect(formatPkr(1890)).toMatch(/1,890/);
  });
});

describe("formatPkrMinor", () => {
  it("formats integer paisa without inventing a catalogue price", () => {
    expect(formatPkrMinor(189000)).toMatch(/1,890\.00/);
    expect(formatPkrMinor(50)).toMatch(/0\.50/);
  });
});
