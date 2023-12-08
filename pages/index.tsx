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
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();
  const user = useUser();
  const handleButtonClick = () => {
    router.push("/auth");
  };
  return (
    <div className="min-h-screen dark:bg-gray-900">
      <Navigation />
      <Header email={user.email} signOut={user.signOut} />
      <div>
        <div>
          <h1
            //className="w-full h-100 p-10 text-center font-custom"
            style={{
              fontFamily: "Times New Roman",
              color: "teal",
              fontSize: "24px",
            }}
          >
            Welcome to RateMyLoo!
          </h1>
          <h2
            style={{
              fontFamily: "Times New Roman",
              color: "grey",
              fontSize: "24px",
            }}
          >
            Please log in or sign up to gain access
          </h2>
          <h3
            style={{
              fontFamily: "Times New Roman",
              color: "teal",
              fontSize: "24px",
              paddingTop: "10px",
            }}
          >
            What is Rate My Loo?
          </h3>
          <h4
            style={{
              fontFamily: "Times New Roman",
              color: "grey",
              fontSize: "24px",
            }}
          >
            Rate My Loo is a website where you can upload
          </h4>
          <h5
            style={{
              fontFamily: "Times New Roman",
              color: "grey",
              fontSize: "24px",
            }}
          >
            images of your bathroom and compare your own to others!
          </h5>
          <h6
            style={{
              fontFamily: "Times New Roman",
              color: "grey",
              fontSize: "24px",
            }}
          >
            Log in and see for yourself!
          </h6>
          <button id="myButton" onClick={handleButtonClick}>
            Log into FireBase
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default withUser()(Home);
