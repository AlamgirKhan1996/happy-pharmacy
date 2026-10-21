export type ProcessEnvLike = Record<string, string | undefined>;

const CLOUDINARY_HOST = "res.cloudinary.com";
const CLOUD_NAME_PATTERN = /^[a-zA-Z0-9_-]{1,64}$/;

export function getCloudinaryCloudName(
  env: ProcessEnvLike = process.env,
): string | null {
  const name = env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?.trim() ?? "";

  if (!name) {
    return null;
  }

  if (!CLOUD_NAME_PATTERN.test(name)) {
    return null;
  }

  return name;
}

export function cloudinaryImageRemotePatterns(
  env: ProcessEnvLike = process.env,
) {
  const cloudName = getCloudinaryCloudName(env);

  if (!cloudName) {
    return [];
  }

  return [
    {
      protocol: "https" as const,
      hostname: CLOUDINARY_HOST,
      pathname: `/${cloudName}/image/upload/**`,
    },
  ];
}

export function cloudinaryDeliveryUrl(
  publicId: string,
  env: ProcessEnvLike = process.env,
): string | null {
  const cloudName = getCloudinaryCloudName(env);
  const id = publicId.trim().replace(/^\/+/, "");

  if (!cloudName || !id) {
    return null;
  }

  return `https://${CLOUDINARY_HOST}/${cloudName}/image/upload/${id}`;
}
