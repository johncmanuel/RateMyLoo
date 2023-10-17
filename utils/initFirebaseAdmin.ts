import { AppOptions, initializeApp, getApps } from "firebase-admin/app";
import { credential } from "firebase-admin";

export const FirebaseOptions: AppOptions = {
	credential: credential.cert({
		projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
		clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
		// Using JSON to handle newline problems when storing the
		// key as a secret in Vercel. See:
		// https://github.com/vercel/vercel/issues/749#issuecomment-707515089
		privateKey: process.env.FIREBASE_PRIVATE_KEY
			? JSON.parse(process.env.FIREBASE_PRIVATE_KEY)
			: undefined,
	}),
	databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
	storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.appspot.com`,
};

export const initFirebaseAdminApp = () => {
	return !getApps().length ? initializeApp(FirebaseOptions) : getApps()[0];
};
