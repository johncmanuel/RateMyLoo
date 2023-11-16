import { init } from "next-firebase-auth";
import {
	FIREBASE_PUBLIC_API_KEY,
	FIREBASE_AUTH_DOMAIN,
	FIREBASE_DATABASE_URL,
	FIREBASE_PROJECT_ID,
} from "@/env";

const TWELVE_DAYS_IN_MS = 12 * 60 * 60 * 24 * 1000;

const initAuth = () => {
	init({
		// Found an interesting fix for NODE_ENV not being properly evaluated
		// https://stackoverflow.com/questions/39529870/ifprocess-env-node-env-production-always-false
		debug: process.env.NODE_ENV.trim() === "development",
		authPageURL: "/auth",
		appPageURL: "/loo",
		loginAPIEndpoint: "/api/login",
		logoutAPIEndpoint: "/api/logout",
		firebaseClientInitConfig: {
			apiKey: FIREBASE_PUBLIC_API_KEY!,
			authDomain: FIREBASE_AUTH_DOMAIN,
			databaseURL: FIREBASE_DATABASE_URL,
			projectId: FIREBASE_PROJECT_ID,
		},
		cookies: {
			name: "RateMyLoo",
			keys: [
				// Can't reference cookie secrets through env.ts,
				// otherwise next-firebase-auth will complain.
				process.env.COOKIE_SECRET_CURRENT,
				process.env.COOKIE_SECRET_PREVIOUS,
			],
			httpOnly: true,
			maxAge: TWELVE_DAYS_IN_MS,
			overwrite: true,
			path: "/",
			sameSite: "lax",
			secure: process.env.NODE_ENV.trim() !== "development",
			signed: true,
		},
	});
};

export default initAuth;
