import { auth } from "firebaseui";
import firebase from "firebase/compat/app";

export const uiConfig: auth.Config = {
	signInFlow: "popup",
	// Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
	signInSuccessUrl: "http://localhost:3000/",
	signInOptions: [
		firebase.auth.GoogleAuthProvider.PROVIDER_ID,
		firebase.auth.GithubAuthProvider.PROVIDER_ID,
	],
	callbacks: {
		// Avoid redirects after sign-in.
		signInSuccessWithAuthResult: () => false,
	},
};
