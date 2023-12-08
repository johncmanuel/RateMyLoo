// Perform GET, POST, DELETE methods for user images

import type { NextApiRequest, NextApiResponse } from "next";
import initAuth from "@/utils/initAuth";
import { initFirebaseAdminApp } from "@/utils/initFirebaseAdmin";
import { getGCSStorageBucket } from "@/utils/getGCSStorageBucket";
import { getImageURLs } from "@/utils/getImageURLs";
import { verifyIdToken } from "next-firebase-auth";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { UserImages } from "@/types/UserImages";
import shuffle from "@/utils/shuffle";

initFirebaseAdminApp();
initAuth();

const getUserImagesNotInUserHistory = (
  userImgs: UserImages,
  userHistory: UserImages
): UserImages => {
  const result: UserImages = {};

  Object.keys(userImgs).forEach((user) => {
    if (userHistory.hasOwnProperty(user)) {
      const diff = userImgs[user].filter(
        (value) => !userHistory[user].includes(value)
      );
      // add the user to the result if there is no
      // difference
      if (diff.length > 0) result[user] = diff;
    } else {
      // If the key is not present in the user's history,
      // add the entire value to the result
      result[user] = userImgs[user];
    }
  });
  return result;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Ensure user is authenticated via token
  if (!(req.headers && req.headers.authorization)) {
    return res.status(403).json({ error: "Not authorized" });
  }
  const token = req.headers.authorization;
  let user;

  try {
    user = await verifyIdToken(token);
  } catch (e) {
    console.error(e);
    return res.status(403).json({ error: "Not authorized" });
  }
  const userId = user.id as string;
  const { method } = req;

  const bucket = await getGCSStorageBucket();
  const firestore = getFirestore();

  switch (method) {
    // For GET, there should be two variants: one for fetching one picture,
    // and another for fetching a variable amount of pictures.
    // The latter will require more research for a proper implementation:
    //
    // Some example code:
    //
    // const numImages = req.query.numImages as string;
    // let count = 0;
    // if (!numImages) count = Number(numImages);
    // const countLowerBound = 1;
    // const countUpperBound = 4;
    // ...
    // if (countLowerBound <= count && countUpperBound >= count) {
    // 		// get any random images not in the user's feedback history
    // }

    case "GET":
      try {
        const userOnly = req.query.userOnly as string;
        const getImagesNotFromUser = req.query.notFromUser as string;

        const imageFolder = "images/bathroomPictures";

        if (userOnly === "1") {
          let userImageFolder = imageFolder.concat(`/${userId}`);
          const urls = await getImageURLs([userImageFolder]);
          return res.status(200).json(urls[userId]);
        } else if (getImagesNotFromUser === "1") {
          const userUids: string[] = [];
          const userHistory = await firestore
            .collection("history")
            .doc(userId)
            .get();

          // Use Firebase Auth's data to recursively retrieve the users' UID
          // and randomly pick a UID that's not the current user to get images from.
          const getUserUids = async (nextPageToken?: string) => {
            const limitNumOfUsers = 1000;
            const userRecords = await getAuth().listUsers(
              limitNumOfUsers,
              nextPageToken
            );
            for (const user of userRecords.users) {
              if (user.uid !== userId) userUids.push(user.uid);
            }
            if (nextPageToken) await getUserUids(nextPageToken);
          };
          await getUserUids();

          if (userUids.length === 0) {
            return res.status(500).json({
              error:
                "No valid account found that's not you. You may need to wait for others to create an account",
            });
          }

          // Randomly fetch a certain amount of random user uids and
          // populate each uid with an array of their images using getImageURLs
          const numOfRandomUsers = 4; // this can be an env variable
          const randomUsers = shuffle(userUids, numOfRandomUsers);
          const randomUsersWithPath = randomUsers.map((user) =>
            imageFolder.concat(`/${user}`)
          );

          let userImages = await getImageURLs(randomUsersWithPath);

          // Get image urls in userImages but not in history
          if (userHistory.exists) {
            const history = userHistory.data() as UserImages;
            userImages = getUserImagesNotInUserHistory(userImages, history);
          }

          let mergedUrls: string[] = [];

          Object.values(userImages).forEach((urls) => {
            mergedUrls = mergedUrls.concat(urls);
          });

          return res.status(200).json(mergedUrls);
        }
        return res.status(400).json({
          error: "Bad Request: 'images' requires a query parameter.",
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          error: "Internal Server Error",
        });
      }
    // Supports uploading 1 picture at a time
    // TODO: Consider edge cases such as uploading duplicate images, rate limiting,
    // concurrency, and more
    case "POST":
      const queryFile = req.query.file as string;
      if (!queryFile) {
        return res.status(400).json({
          error: "Bad Request: 'file' parameter is missing",
        });
      }
      const image = bucket.file(queryFile);
      const expiresMinutes = Date.now() + 1 * 60 * 1000;
      const fileSizeLimitMegabytes = 10 * 1000000;
      const options = {
        expires: expiresMinutes,
        conditions: [["content-length-range", 0, fileSizeLimitMegabytes]],
        fields: { /*"x-goog-meta-test": "data",*/ acl: "public-read" },
      };
      try {
        const [response] = await image.generateSignedPostPolicyV4(options);
        return res.status(200).json(response);
      } catch (error) {
        console.error("Error generating signed post policy:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    // Deletes a picture given the name of the file
    case "DELETE":
      try {
        const filename = req.query.file;
        if (!filename) {
          return res.status(400).json({
            error: "Bad Request: 'file' parameter is missing",
          });
        }
        const filePath = `images/bathroomPictures/${userId}/${filename}`;
        await bucket.file(filePath).delete();
        return res.status(200).json({ success: true });
      } catch (error) {
        console.error("Error deleting file:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    default:
      return res.status(405).json({ error: `Method '${method}' Not Allowed` });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
