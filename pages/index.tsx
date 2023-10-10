// This page does not require authentication, so it won't
// redirect to the login page if you are not signed in.
//
// If you remove `getServerSideProps` from this page, it
// will be static and load the authed user only on the
// client side.

import React from "react";
import { useUser, withUser, withUserTokenSSR } from "next-firebase-auth";
import Header from "@/components/Header";
import Links from "@/components/Links";

const Home = () => {
	const user = useUser();
	return (
		<div>
			<Header email={user.email} signOut={user.signOut} />
			<div>
				<div>
					<h3>Home</h3>
				</div>
			</div>
			<Links />
		</div>
	);
};

export const getServerSideProps = withUserTokenSSR()();

export default withUser()(Home);
