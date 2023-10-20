// Perform GET, POST, DELETE methods for user images

import type { NextApiRequest, NextApiResponse } from "next";
import initAuth from "@/utils/initAuth";
import { initFirebaseAdminApp } from "@/utils/initFirebaseAdmin";
import { getGCSStorage } from "@/utils/getGCSStorage";
import { getImageURLs } from "@/utils/getImageURLs";
import { verifyIdToken } from "next-firebase-auth";

initFirebaseAdminApp();
initAuth();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// Ensure user is authenticated via token
	if (!(req.headers && req.headers.authorization)) {
		return res.status(400).json({ error: "Not authorized" });
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
	// const bucket = await getGCSStorage(method as string);
	const bucket = await getGCSStorage();

	switch (method) {
		// For GET, there should be two variants: one for fetching one picture,
		// and another for fetching a variable amount of pictures.
		// The latter will require more research for a proper implementation
		case "GET":
			try {
				const userOnly = req.query.userOnly as string;
				let imageFolder = "images/bathroomPictures";
				if (userOnly === "1") {
					imageFolder = imageFolder.concat(`/${userId}`);
				}
				const urls = await getImageURLs(bucket, imageFolder);
				return res.status(200).json(urls);
			} catch (error) {
				console.error("error");
				return res.status(500).json({
					error: "Internal Server Error",
				});
			}
		// Supports uploading 1 picture at a time
		// TODO: May want to limit amount of pictures user can
		// upload (probably around 5)
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
				// console.log("response", response);
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
