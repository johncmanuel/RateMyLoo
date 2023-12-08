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
import { useEffect, useState } from "react";
import { authFetch } from "@/utils/authFetch";
import BathroomImage from "@/components/BathroomImage";
import shuffle from "@/utils/shuffle";
import Footer from "../components/Footer";
import Navigation from "@/components/NavBar";

// Loo should only perform GET requests to user data. For other methods,
// it should be performed in the user page.
const Loo = () => {
  const user = useUser();
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [showImages, setShowImages] = useState(false);
  const MAX_FETCH_ATTEMPTS = 5; // this can be an env variable in the future

  useEffect(() => {
    // Fetches a batch of other user images for the current user
    // to rate
    const getOtherUserImages = async () => {
      const token = (await user.getIdToken()) as string;
      let data: string[] = [];
      let fetchAttempts = 0;
      while (data.length < 1 && fetchAttempts < MAX_FETCH_ATTEMPTS) {
        const res = await authFetch("/api/images?notFromUser=1", token);
        data = await res.json();
        fetchAttempts++;
      }
      setCurrentImages(data);
      setShowImages(true);
    };
    getOtherUserImages();
  }, []);

  // Operate on image clicked, hide the 2 images,
  // fetch next pair, then show next 2 images
  const handleImageClick = async (imageClicked: string): Promise<void> => {
    setShowImages(false);

    // Update user's history with new data
    const token = (await user.getIdToken()) as string;
    const requestsOptions: RequestInit = {
      // headers: new Headers({
      // 	"Content-Type": "application/json",
      // }),
      body: JSON.stringify({ data: imageClicked }),
    };
    const sendImageClickedToHistory = await authFetch(
      `/api/firestore?collection=history`,
      token,
      "POST",
      requestsOptions
    );
    if (!sendImageClickedToHistory.ok) {
      console.log("something went wrong");
    }
    console.log(await sendImageClickedToHistory.json());

    // Remove image from current batch, then shuffle it and
    // update the state variable for displaying current images.
    if (currentImages.length > 0) {
      const updatedData = currentImages.filter(
        (imageUrl) => imageUrl !== imageClicked
      );
      const shuffledData = shuffle(updatedData);
      setCurrentImages(shuffledData);
      setShowImages(true);
      return;
    }

    // Fetch next set of images if current batch is empty
    const res = await authFetch("/api/images?notFromUser=1", token);
    const data: string[] = await res.json();

    setCurrentImages(data);
    setShowImages(true);
  };

  return (
    <div className="min-h-screen dark:bg-gray-900">
      <Navigation />
      <Header email={user.email} signOut={user.signOut} />
      {showImages && (
        <div>
          {currentImages[0] && (
            <BathroomImage
              src={currentImages[0]}
              width={200}
              height={200}
              onClickCallback={async () => handleImageClick(currentImages[0])}
            />
          )}
          {currentImages[1] && (
            <BathroomImage
              src={currentImages[1]}
              width={200}
              height={200}
              onClickCallback={async () => handleImageClick(currentImages[1])}
            />
          )}
        </div>
      )}
      {currentImages.length === 0 && (
        <div>
          <p className="text-teal-500">
            no more bathroom pictures to rate! wait for more users to upload
            their pictures!
          </p>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default withUser({
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  // LoaderComponent: <react component>
})(Loo);
