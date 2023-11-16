import { AppOptions, initializeApp, getApps } from "firebase-admin/app";
import { credential } from "firebase-admin";
import {
	FIREBASE_CLIENT_EMAIL,
	FIREBASE_PROJECT_ID,
	FIREBASE_PRIVATE_KEY,
	FIREBASE_DATABASE_URL,
} from "@/env";

export const FirebaseOptions: AppOptions = {
	credential: credential.cert({
		projectId: FIREBASE_PROJECT_ID!,
		clientEmail: FIREBASE_CLIENT_EMAIL!,
		// Using JSON to handle newline problems when storing the
		// key as a secret in Vercel. See:
		// https://github.com/vercel/vercel/issues/749#issuecomment-707515089
		privateKey: FIREBASE_PRIVATE_KEY
			? JSON.parse(FIREBASE_PRIVATE_KEY)
			: undefined,
	}),
	databaseURL: FIREBASE_DATABASE_URL,
	storageBucket: `${FIREBASE_PROJECT_ID}.appspot.com`,
};

export const initFirebaseAdminApp = () => {
	return !getApps().length ? initializeApp(FirebaseOptions) : getApps()[0];
};
