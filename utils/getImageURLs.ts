import { getStorage } from "firebase-admin/storage";

export const getImageURLs = async (
	folderPath: string,
	maxFiles: number = 5
) => {
	const bucket = getStorage().bucket();

	const [files] = await bucket.getFiles({
		prefix: folderPath,
		maxResults: maxFiles,
	});

	const publicUrls: string[] = [];

	for (const file of files) {
		const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
		publicUrls.push(publicUrl);
	}

	return publicUrls;
};
