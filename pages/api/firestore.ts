import type { NextApiRequest, NextApiResponse } from "next";
import initAuth from "@/utils/initAuth";
import { verifyIdToken } from "next-firebase-auth";
import { initFirebaseAdminApp } from "@/utils/initFirebaseAdmin";
import { getFirestore } from "firebase-admin/firestore";
import { UserImages } from "@/types/UserImages";

initFirebaseAdminApp();
initAuth();

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

	const { method, body } = req;

	const userId = user.id as string;

	let collection = req.query.collection as string;
	if (!collection) {
		return res.status(400).json({
			error: "Bad Request: 'collection' parameter is missing",
		});
	}
	collection = collection.replace(/_/g, "/");

	// Contains the data sent by the user
	let parsedBody;
	try {
		parsedBody = JSON.parse(body).data;
		// parsedBody = parsedBody.data;
	} catch (error) {
		console.error("Error parsing JSON:", error);
	}

	const parts: string[] = parsedBody.split("/");
	const getUserIdFromImageUrl: string = parts[parts.length - 2];

	const firestore = getFirestore();

	// Not sure if we'll need the other methods, but we'll modify
	// the cases as needed.
	switch (method) {
		case "GET":
			try {
				const snapshot = await firestore.collection(collection).get();
				const data = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				return res.status(200).json(data);
			} catch (error) {
				console.error("Error fetching data:", error);
				return res.status(500).json({ error: "Error fetching data" });
			}
		// NOTE:
		// See all valid data types for Firestore:
		// https://firebase.google.com/docs/firestore/manage-data/add-data?hl=en&authuser=0#data_types
		case "POST":
			try {
				const docRef = await firestore
					.collection(collection)
					.doc(userId);

				const docSnapshot = await docRef.get();

				// If document doesn't exist at a given path, create
				// one and add the data into it.
				if (!docSnapshot.exists) {
					if (collection == "history") {
						const data: UserImages = {};
						data[getUserIdFromImageUrl] = [parsedBody];
						await docRef.set(data);
						return res.status(201).json({
							data: "created new doc and sent data to firestore",
						});
					}
				}

				// Guarenteed to have data at this point if docSnapshot exists
				const existingData =
					docSnapshot.data() as FirebaseFirestore.DocumentData;

				// In Firestore under history/{userId}, each field should contain
				// a user's ID as key and the urls being an array of images owned
				// by a particular user
				if (collection == "history") {
					if (!(getUserIdFromImageUrl in existingData)) {
						existingData[getUserIdFromImageUrl] = [parsedBody];
					} else {
						const arrImgUrls: string[] =
							existingData[getUserIdFromImageUrl];
						if (!arrImgUrls.includes(parsedBody))
							arrImgUrls.push(parsedBody);
					}
				}
				await docRef.update(existingData);
				return res.status(201).json({ data: "data sent to firestore" });
			} catch (error) {
				console.error("Error creating document:", error);
				return res
					.status(500)
					.json({ error: "Error creating document" });
			}
		case "PUT":
			try {
				const { id, ...data } = body;
				// Hmmm, merge: true or not?
				await firestore
					.collection(collection)
					.doc(id)
					.set(data, { merge: true });
				return res.status(200).json({ id });
			} catch (error) {
				console.error("Error updating document:", error);
				return res
					.status(500)
					.json({ error: "Error updating document" });
			}
		case "DELETE":
			try {
				const { id } = body;
				await firestore.collection(collection).doc(id).delete();
				return res.status(200).json({ id });
			} catch (error) {
				console.error("Error deleting document:", error);
				return res
					.status(500)
					.json({ error: "Error deleting document" });
			}
		default:
			return res
				.status(405)
				.json({ error: `Method '${method}' Not Allowed` });
	}
}
