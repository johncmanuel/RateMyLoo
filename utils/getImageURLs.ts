import { getStorage } from "firebase-admin/storage";
import { UserImages } from "@/types/UserImages";

export const getImageURLs = async (
	folderPaths: string[]
): Promise<UserImages> => {
	const bucket = getStorage().bucket();
	// const publicUrls: string[] = [];
	const urls: UserImages = {};

	for (const path of folderPaths) {
		const [files] = await bucket.getFiles({
			prefix: path,
		});

		const lastSlashIdx = path.lastIndexOf("/");
		const userId =
			lastSlashIdx !== -1 ? path.substring(lastSlashIdx + 1) : path;

		if (!(path in urls)) urls[userId] = [];

		for (const file of files) {
			const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
			// publicUrls.push(publicUrl);
			urls[userId].push(publicUrl);
		}
	}
	return urls;
	// return publicUrls;
};
