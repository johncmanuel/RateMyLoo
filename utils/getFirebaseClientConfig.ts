// import { FirebaseOptions } from "firebase/app";
//
// next-firebase-auth doesn't accept an obj with type
// FirebaseOptions, see the full list of options here:
// https://firebase.google.com/docs/web/learn-more#config-object
export const firebaseClientConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY!,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};
