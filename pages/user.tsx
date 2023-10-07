import { useUser, withUser, AuthAction } from "next-firebase-auth";
import initAuth from "@/utils/initAuth";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import Image from "next/image";

initAuth();

const User = () => {
	const user = useUser();
	const [isUploaded, setIsUploaded] = useState(false);
	const [name, setName] = useState("");
	const [images, setImages] = useState<string[]>([]);

	// Uploads only 1 image at a time
	const uploadImage = async (f: any) => {
		const file = f.target.files[0];
		const filename = `images/bathroomPictures/${user.id}/${file.name}`;
		const uriFilename = encodeURIComponent(filename);

		// Exclude user.id when showing name of file to user
		setName(file.name);

		const res = await fetch(`/api/images?file=${uriFilename}`, {
			method: "POST",
			headers: new Headers({ "content-type": "image/png" }),
		});
		const { url, fields } = await res.json();

		const formData = new FormData();
		Object.entries({ ...fields, file }).forEach(([key, value]) => {
			// argument "value" is throwing an error
			// regarding its type
			// @ts-ignore
			formData.append(key, value);
		});

		const upload = await fetch(url, {
			method: "POST",
			body: formData,
		});

		if (upload.ok) {
			setIsUploaded(true);
			try {
				const imagesURLs = await fetch("/api/images?userOnly=1", {
					method: "GET",
				});
				const data = await imagesURLs.json();
				setImages(data);
			} catch (error) {
				console.error("error fetching image urls:", error);
			}
		}
	};

	useEffect(() => {
		const getImages = async () => {
			// Get only the images for the authenticated user
			const res = await fetch(`/api/images?userOnly=1`, {
				method: "GET",
			});
			const data = await res.json();
			setImages(data);
		};
		getImages();
	}, []);

	return (
		<div>
			<Header email={user.email} signOut={user.signOut} />
			<div>User page</div>
			<p>Upload a .png or .jpg image</p>
			<input
				onChange={uploadImage}
				type="file"
				accept="image/png, image/jpeg"
			/>
			{isUploaded && <p>Successfully uploaded {name}!</p>}
			{images.map((imageURL: string) => (
				<Image
					src={imageURL}
					alt="Picture of bathroom for current user"
					width={200}
					height={200}
					priority={true}
				/>
			))}
		</div>
	);
};

export default withUser({
	whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
	whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(User);
