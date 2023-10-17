import { init } from "next-firebase-auth";

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
		// Initialize Firebase Admin SDK
		// useFirebaseAdminDefaultCredential: true,
		// firebaseAdminInitConfig: {
		// 	credential: {
		// 		projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
		// 		clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
		// 		// Using JSON to handle newline problems when storing the
		// 		// key as a secret in Vercel. See:
		// 		// https://github.com/vercel/vercel/issues/749#issuecomment-707515089
		// 		privateKey: process.env.FIREBASE_PRIVATE_KEY
		// 			? JSON.parse(process.env.FIREBASE_PRIVATE_KEY)
		// 			: undefined,
		// 	},
		// 	databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
		// 	// @ts-ignore
		// 	storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.appspot.com`,
		// },
		// Initialize Firebase Client SDK
		firebaseClientInitConfig: {
			apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY!,
			authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
			databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
			projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
		},
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
