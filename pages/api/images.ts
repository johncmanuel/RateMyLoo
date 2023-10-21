// Perform GET, POST, DELETE methods for user images

import type { NextApiRequest, NextApiResponse } from "next";
import initAuth from "@/utils/initAuth";
import { initFirebaseAdminApp } from "@/utils/initFirebaseAdmin";
import { getGCSStorage } from "@/utils/getGCSStorage";
import { getImageURLs } from "@/utils/getImageURLs";
import { verifyIdToken } from "next-firebase-auth";
import { getAuth } from "firebase-admin/auth";

initFirebaseAdminApp();
initAuth();

let imageFolder = "images/bathroomPictures";

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
	const userId = user.id;
	const { method } = req;

	const bucket = await getGCSStorage();

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

				if (userOnly === "1") {
					imageFolder = imageFolder.concat(`/${userId}`);
				} else if (getImagesNotFromUser === "1") {
					const userUids: string[] = [];

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
							error: "No valid account found that's not you. You may need to wait for others to create an account",
						});
					}

					const randomUser =
						userUids[Math.floor(Math.random() * userUids.length)];

					imageFolder = imageFolder.concat(`/${randomUser}`);
				}
				const urls = await getImageURLs(imageFolder);
				return res.status(200).json(urls);
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
				conditions: [
					["content-length-range", 0, fileSizeLimitMegabytes],
				],
				fields: { /*"x-goog-meta-test": "data",*/ acl: "public-read" },
			};
			try {
				const [response] = await image.generateSignedPostPolicyV4(
					options
				);
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
			return res
				.status(405)
				.json({ error: `Method '${method}' Not Allowed` });
	}
}

export const config = {
	api: {
		bodyParser: false,
	},
};
