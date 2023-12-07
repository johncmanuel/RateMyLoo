// This auth page is static. It will client-side
// redirect to the app if the user is already authenticated.

import React from "react";
import { withUser, AuthAction } from "next-firebase-auth";
import FirebaseAuth from "../components/FirebaseAuth";
import Navigation from "@/components/NavBar";

const Auth = () => (
	<div className="min-h-screen dark:bg-gray-900">
		<Navigation />
		<div>
			<FirebaseAuth />
		</div>
	</div>
);

export default withUser({
	whenAuthed: AuthAction.REDIRECT_TO_APP,
	whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
	whenUnauthedAfterInit: AuthAction.RENDER,
})(Auth);
