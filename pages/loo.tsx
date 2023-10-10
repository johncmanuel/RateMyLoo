// This page requires is static but requires
// authentication. Before the Firebase client SDK
// initializes, it shows a loader. After initializing, if
// the user is not authenticated, it client-side redirects
// to the login page.
//
// Note at the bottom, there is a LoaderComponent for withUser(). A react
// component can be used to show a loading screen or something.

import React from "react";
import { useUser, withUser, AuthAction } from "next-firebase-auth";
import Header from "../components/Header";
import Links from "@/components/Links";

const Loo = () => {
	const AuthUser = useUser(); // the user is guaranteed to be authenticated

	return (
		<div>
			<Header email={AuthUser.email} signOut={AuthUser.signOut} />
			<div>
				<h3>Loo page</h3>
				<p>
					This is where the users can decide between the two images on
					whether one looks better than the other.
				</p>
			</div>
			<Links />
		</div>
	);
};

export default withUser({
	whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
	whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
	// LoaderComponent: <react component>
})(Loo);
