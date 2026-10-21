import { describe, expect, it } from "vitest";

import {
  cloudinaryDeliveryUrl,
  cloudinaryImageRemotePatterns,
  getCloudinaryCloudName,
} from "./cloudinary";

describe("Cloudinary next/image allowlist", () => {
  it("does not allow a remote host until an exact cloud name is set", () => {
    expect(getCloudinaryCloudName({})).toBeNull();
    expect(cloudinaryImageRemotePatterns({})).toEqual([]);
  });

  it("scopes remotePatterns to res.cloudinary.com and the exact account path", () => {
    const env = { NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "happy_pharmacy_demo" };

    expect(cloudinaryImageRemotePatterns(env)).toEqual([
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/happy_pharmacy_demo/image/upload/**",
      },
    ]);
    expect(cloudinaryDeliveryUrl("folder/photo", env)).toBe(
      "https://res.cloudinary.com/happy_pharmacy_demo/image/upload/folder/photo",
    );
  });

  it("rejects wildcard or path-like cloud names", () => {
    expect(
      getCloudinaryCloudName({ NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "*" }),
    ).toBeNull();
    expect(
      getCloudinaryCloudName({
        NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "**.cloudinary.com",
      }),
    ).toBeNull();
    expect(
      cloudinaryImageRemotePatterns({
        NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "acct/../other",
      }),
    ).toEqual([]);
  });
});
