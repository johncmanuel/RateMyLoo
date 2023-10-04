// Perform GET, POST methods for user images

import type { NextApiRequest, NextApiResponse } from "next";
import { getStorage } from "firebase-admin/storage";
import initAuth from "@/utils/initAuth";
import { initFirebaseAdminApp } from "@/utils/initFirebaseAdmin";
initFirebaseAdminApp();
initAuth();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { method } = req;

	const bucket = getStorage().bucket();

	switch (method) {
		case "GET":
		case "POST":
			const image = bucket.file(req.query.file as string);
			const options = {
				expires: Date.now() + 1 * 60 * 1000, // 1 minute
				fields: { "x-goog-meta-test": "data" },
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
	}
	res.status(200).json({ message: "Hello from Next.js!" });
}

export const config = {
	api: {
		bodyParser: false,
	},
};
