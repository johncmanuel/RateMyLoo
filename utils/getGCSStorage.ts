import { getStorage } from "firebase-admin/storage";

export const getGCSStorage = async (
	method: string,
	maxAgeSeconds: number = 3600
) => {
	const bucket = getStorage().bucket();
	await bucket.setCorsConfiguration([
		{
			maxAgeSeconds: maxAgeSeconds,
			method: [method],
			origin: [process.env.NEXT_PUBLIC_URL as string],
			responseHeader: [
				"Content-Type",
				"access-control-allow-origin",
				"access-control-allow-header",
				"authorization",
			],
		},
	]);
	// const [metadata] = await bucket.getMetadata();
	// console.log(JSON.stringify(metadata, null, 2));
	return bucket;
};
