// Perform GET, POST methods for user images

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
		// eslint-disable-next-line no-console
		console.error(e);
		return res.status(403).json({ error: "Not authorized" });
	}
	const userId = user.id;
	const { method } = req;
	const bucket = await getGCSStorage(method as string);

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
				res.status(200).json(urls);
			} catch (error) {
				res.status(500).json({
					error: "failed to get urls for bathroom pictures",
				});
			}
		// Supports uploading 1 picture at a time
		case "POST":
			const queryFile = req.query.file as string;
			if (!queryFile) {
				return res.status(400).json({
					error: "Bad Request: 'file' parameter is missing",
				});
			}
			const image = bucket.file(queryFile);
			const expiresMinutes = Date.now() + 1 * 60 * 1000;
			const options = {
				expires: expiresMinutes,
				fields: { "x-goog-meta-test": "data", acl: "public-read" },
			};
			try {
				const [response] = await image.generateSignedPostPolicyV4(
					options
				);
				console.log("response", response);
				res.status(200).json(response);
			} catch (error) {
				console.error("Error generating signed post policy:", error);
				res.status(500).json({ error: "Internal Server Error" });
			}
		// Deletes a picture given the name of the file
		case "DELETE":
			try {
				const filename = req.query.file;
				if (!filename) {
					return res
						.status(400)
						.json({ error: "File ID is required" });
				}
				const filePath = `images/bathroomPictures/${userId}/${filename}`;
				await bucket.file(filePath).delete();
				res.status(200).json({ success: true });
			} catch (error) {
				console.error("Error deleting file:", error);
				return res.status(500).json({ error: "Internal Server Error" });
			}
		default:
			res.status(405).end(`Method '${method}' Not Allowed`);
	}
}

export const config = {
	api: {
		bodyParser: false,
	},
};
