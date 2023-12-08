export const FIREBASE_PUBLIC_API_KEY =
  process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY;

export const FIREBASE_CLIENT_EMAIL = process.env.FIREBASE_CLIENT_EMAIL;

export const FIREBASE_AUTH_DOMAIN =
  process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;

export const FIREBASE_DATABASE_URL =
  process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;

export const FIREBASE_PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

export const PORT = parseInt(process.env.PORT || "3000");

export const URL = process.env.NEXT_PUBLIC_URL || `http://localhost:${PORT}`;

export const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(",");

export const FIREBASE_PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY;

// Can't reference cookie secrets through env.ts,
// otherwise next-firebase-auth will complain.

// export const COOKIE_SECRET_CURRENT =
// 	process.env.COOKIE_SECRET_CURRENT || "my-current-cookie-secret-hehe";

// export const COOKIE_SECRET_PREVIOUS =
// 	process.env.COOKIE_SECRET_PREVIOUS || "my-previous-cookie-secret-hehe";
