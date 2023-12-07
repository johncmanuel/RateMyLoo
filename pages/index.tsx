// This page does not require authentication, so it won't
// redirect to the login page if you are not signed in.
//
// If you remove `getServerSideProps` from this page, it
// will be static and load the authed user only on the
// client side.

import React from "react";
import { useUser, withUser } from "next-firebase-auth";
import Header from "@/components/Header";
import Footer from "../components/Footer";
import Navigation from "@/components/NavBar";

const Home = () => {
	const user = useUser();
	return (
		<div className="min-h-screen dark:bg-gray-900">
			<Navigation />
			<Header email={user.email} signOut={user.signOut} />
			<div>
				<div>
					<h3 className="text-teal-500">Home</h3>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default withUser()(Home);
