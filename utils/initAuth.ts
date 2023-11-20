import { init } from "next-firebase-auth";
import { firebaseClientConfig } from "./getFirebaseClientConfig";

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
		firebaseClientInitConfig: firebaseClientConfig,
		cookies: {
			name: "RateMyLoo",
			keys: [
				process.env.COOKIE_SECRET_CURRENT,
				process.env.COOKIE_SECRET_PREVIOUS,
			],
			httpOnly: true,
			maxAge: TWELVE_DAYS_IN_MS,
			overwrite: true,
			path: "/",
			sameSite: "lax",
			secure: true,
			signed: true,
		},
	});
};

export default initAuth;
