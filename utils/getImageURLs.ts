// import { getStorage, ref, list } from "firebase/storage";

export const getImageURLs = async (bucket: any, folderPath: string) => {
	const [files] = await bucket.getFiles({
		prefix: folderPath,
	});

	const publicUrls = [];

	for (const file of files) {
		const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
		publicUrls.push(publicUrl);
	}

	return publicUrls;
};
