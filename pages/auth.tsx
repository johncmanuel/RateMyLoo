// This auth page is static. It will server-side
// redirect to the app if the user is already authenticated.

import React from "react";
import { withUser, withUserTokenSSR, AuthAction } from "next-firebase-auth";
import FirebaseAuth from "../components/FirebaseAuth";

const Auth = () => (
	<div>
		<h3>Sign in</h3>
		<div>
			<p>RateMyLoo</p>
		</div>
		<div>
			<FirebaseAuth />
		</div>
	</div>
);

export const getServerSideProps = withUserTokenSSR({
	whenAuthed: AuthAction.REDIRECT_TO_APP,
})();

export default withUser({
	whenAuthed: AuthAction.REDIRECT_TO_APP,
})(Auth);
