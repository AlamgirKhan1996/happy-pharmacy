import { describe, expect, it } from "vitest";

import { isInternalPreviewAllowed } from "./internal-preview";

describe("internal development preview gate", () => {
  it("allows the preview outside production", () => {
    expect(isInternalPreviewAllowed({ NODE_ENV: "development" })).toBe(true);
    expect(isInternalPreviewAllowed({ NODE_ENV: "test" })).toBe(true);
  });

  it("blocks the preview in production", () => {
    expect(isInternalPreviewAllowed({ NODE_ENV: "production" })).toBe(false);
  });
});
