import { describe, expect, it } from "vitest";

import {
  isDraftHomepageShowcaseEnabled,
  sizeLabelFromRecordedName,
} from "./homepage-showcase";

describe("draft homepage showcase gate", () => {
  it("stays off unless the explicit preview flag is set", () => {
    expect(isDraftHomepageShowcaseEnabled({})).toBe(false);
    expect(
      isDraftHomepageShowcaseEnabled({ SHOW_DRAFT_HOMEPAGE_SHOWCASE: "false" }),
    ).toBe(false);
  });

  it("can enable the homepage-only showcase outside production", () => {
    expect(
      isDraftHomepageShowcaseEnabled({
        NODE_ENV: "development",
        SHOW_DRAFT_HOMEPAGE_SHOWCASE: "true",
      }),
    ).toBe(true);
  });

  it("never enables the showcase in production", () => {
    expect(
      isDraftHomepageShowcaseEnabled({
        NODE_ENV: "production",
        SHOW_DRAFT_HOMEPAGE_SHOWCASE: "true",
      }),
    ).toBe(false);
  });

  it("reads pack size only from an already recorded name", () => {
    expect(sizeLabelFromRecordedName("Johnson's Baby Bath 200 ml")).toBe(
      "200 ml",
    );
    expect(sizeLabelFromRecordedName("Johnson's Baby Powder 200 g")).toBe(
      "200 g",
    );
    expect(sizeLabelFromRecordedName("Johnson's Baby Cream")).toBeNull();
  });
});
