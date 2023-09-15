// Website used to help with setting up firebaseUI:
// http://howto.philippkeller.com/2023/03/11/How-to-use-firebase-to-authenticate-next-js-react-against-flask-backend/

"use client";
import { app, auth } from "@/firebase/config";
import { getAuth, User } from "firebase/auth";
import { useEffect, useState } from "react";
import StyledFirebaseAuth from "@/components/StyledFirebaseAuth";
import "firebase/compat/auth";
import { fetchJson, postJwt } from "@/utils/api";
import { uiConfig } from "@/firebase/uiConfig";

export default function FirebaseExample() {
	const [isSignedIn, setIsSignedIn] = useState(false);
	const [user, setUser] = useState<User | null>(null);

	// For showing the firebase response after signing in
	// Only for demo purposes
	const userInfo = (user: User | null) => {
		return (
			<div>
				{user ? (
					<>
						<div>you're signed in</div>
						<div>info:</div>
						<ul>
							<li>Display Name: {user.displayName}</li>
							<li>Email: {user.email}</li>
							<li>User UID: {user.uid}</li>
							<li>Token: {user.getIdToken()}</li>
						</ul>
					</>
				) : (
					<div>user is null</div>
				)}
			</div>
		);
	};

	useEffect(() => {
		const fetchData = async () => {
			const unregisterAuthObserver = getAuth(app).onAuthStateChanged(
				async (user: User | null) => {
					if (user != null) {
						console.log("posting user info:", user);
						try {
							const res = await postJwt(
								"/api/auth/sign-in",
								await user.getIdToken()
							);
							console.log("res", res);
						} catch (error) {
							console.error("Error posting JWT -", error);
						}
					}
					setIsSignedIn(!!user);
				}
			);
			// Make sure to un-register Firebase observers when the component unmounts.
			return () => unregisterAuthObserver();
		};
		fetchData();
	}, []);

	return (
		<>
			<div>
				{/* If not signed in, show the sign-in buttons */}
				{!isSignedIn && (
					<div id="firebase">
						<StyledFirebaseAuth
							uiConfig={uiConfig}
							firebaseAuth={auth}
						/>
					</div>
				)}
				{/* {isSignedIn && userInfo(user)} */}
			</div>
		</>
	);
}
