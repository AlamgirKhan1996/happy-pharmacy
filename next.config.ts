import type { NextConfig } from "next";

import { cloudinaryImageRemotePatterns } from "./lib/cloudinary";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: cloudinaryImageRemotePatterns(),
  },
};

export default nextConfig;
