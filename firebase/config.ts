import { initializeApp, getApps } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECTID;

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
	authDomain: `${projectId}.firebaseapp.com`,
	projectId: projectId,
	storageBucket: `${projectId}.appspot.com`,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
	measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID,
};
const app =
	getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// TODO: Implement analytics into the app towards the end.
// const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, auth };
