// This auth page is static. It will client-side
// redirect to the app if the user is already authenticated.

import React from "react";
import { withUser, AuthAction } from "next-firebase-auth";
import FirebaseAuth from "../components/FirebaseAuth";
import Links from "@/components/Links";

const Auth = () => (
	<div>
		<h3>Sign in</h3>
		<div>
			<p>RateMyLoo</p>
		</div>
		<div>
			<FirebaseAuth />
		</div>
		<Links />
	</div>
);

export default withUser({
	whenAuthed: AuthAction.REDIRECT_TO_APP,
	whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
	whenUnauthedAfterInit: AuthAction.RENDER,
})(Auth);
