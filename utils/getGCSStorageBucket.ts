import { getStorage } from "firebase-admin/storage";

export const getGCSStorageBucket = async (maxAgeSeconds: number = 3600) => {
  const bucket = getStorage().bucket();
  const origins = process.env.ALLOWED_ORIGINS?.split(",");
  await bucket.setCorsConfiguration([
    {
      maxAgeSeconds: maxAgeSeconds,
      method: ["GET", "POST", "DELETE"],
      // origin: [process.env.NEXT_PUBLIC_URL as string],
      origin: origins,
      responseHeader: [
        "Content-Type",
        "Access-Control-Allow-Origin",
        "Access-Control-Allow-Header",
        "Authorization",
      ],
    },
  ]);
  return bucket;
};
