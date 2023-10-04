// This page requires is static but requires
// authentication. Before the Firebase client SDK
// initializes, it shows a loader. After initializing, if
// the user is not authenticated, it client-side redirects
// to the login page.
//
// Note at the bottom, there is a LoaderComponent for withUser(). A react
// component can be used to show a loading screen or something.

import React, { useCallback, useEffect, useState } from "react";
import { useUser, withUser, AuthAction } from "next-firebase-auth";
import Header from "../components/Header";
import getAbsoluteURL from "../utils/getAbsoluteURL";

const Loo = () => {
	const AuthUser = useUser(); // the user is guaranteed to be authenticated

	const [favoriteColor, setFavoriteColor] = useState();
	const fetchData = useCallback(async () => {
		const token = await AuthUser.getIdToken();
		const endpoint = getAbsoluteURL("/api/example");
		const response = await fetch(endpoint, {
			method: "GET",
			headers: {
				Authorization: token,
			},
		});
		const data = await response.json();
		if (!response.ok) {
			// eslint-disable-next-line no-console
			console.error(
				`Data fetching failed with status ${
					response.status
				}: ${JSON.stringify(data)}`
			);
			return null;
		}
		return data;
	}, [AuthUser]);

	useEffect(() => {
		let isCancelled = false;
		const fetchFavoriteColor = async () => {
			const data = await fetchData();
			if (!isCancelled) {
				setFavoriteColor(data ? data.favoriteColor : "unknown :(");
			}
		};
		fetchFavoriteColor();
		return () => {
			// A quick but not ideal way to avoid state updates after unmount.
			// In your app, prefer aborting fetches:
			// https://developers.google.com/web/updates/2017/09/abortable-fetch
			isCancelled = true;
		};
	}, [fetchData]);

	return (
		<div>
			<Header email={AuthUser.email} signOut={AuthUser.signOut} />
			<div>
				<div>
					<h3>Loo page</h3>
					<p>
						This is where the users can decide whether the image
						would work
					</p>
					<p>Your favorite color is: {favoriteColor}</p>
				</div>
			</div>
		</div>
	);
};

export default withUser({
	whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
	whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
	// LoaderComponent: <react component>
})(Loo);
