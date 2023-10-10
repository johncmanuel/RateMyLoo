import { useUser, withUser, AuthAction } from "next-firebase-auth";
import initAuth from "@/utils/initAuth";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import Image from "next/image";
import Links from "@/components/Links";

initAuth();

const User = () => {
	const user = useUser();
	const [isUploaded, setIsUploaded] = useState(false);
	const [name, setName] = useState("");
	const [images, setImages] = useState<string[]>([]);

	// Uploads only 1 image at a time
	// TODO: May want to limit amount of pictures user can
	// upload (probably around 5)
	const uploadImage = async (f: any) => {
		const file = f.target.files[0];
		const filename = `images/bathroomPictures/${user.id}/${file.name}`;
		const uriFilename = encodeURIComponent(filename);

		// Exclude user.id when showing name of file to user
		setName(file.name);

		const token = (await user.getIdToken()) as string;

		// For better optimzation techniques on fetching, see:
		// https://github.com/gladly-team/next-firebase-auth/blob/2c8f771e7ca286063b1b0afea9b8796832550728/example/pages/static-auth-required-loader.js#L21
		const res = await fetch(`/api/images?file=${uriFilename}`, {
			method: "POST",
			headers: new Headers({
				"content-type": "image/png",
				Authorization: token,
			}),
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
					headers: new Headers({
						Authorization: token,
					}),
				});
				const data = await imagesURLs.json();
				setImages(data);
			} catch (error) {
				console.error("error fetching image urls: ", error);
			}
		}
	};

	// Delete an image given the name of the image.
	// Might need to make images interactable and delete
	// them given the name of the image
	const deleteImage = async (imgUrl: string) => {
		// Example imgURL:
		// https://storage.googleapis.com/xxx.appspot.com/images/bathroomPictures/123456789/img.jpg
		const urlSegments = imgUrl.split("/");
		const token = (await user.getIdToken()) as string;
		const filename = urlSegments[urlSegments.length - 1];

		const res = await fetch(`/api/images?file=${filename}`, {
			method: "DELETE",
			headers: new Headers({
				Authorization: token,
			}),
		});
		if (res.ok) {
			try {
				const imagesURLs = await fetch("/api/images?userOnly=1", {
					method: "GET",
					headers: new Headers({
						Authorization: token,
					}),
				});
				const data = await imagesURLs.json();
				setImages(data);
			} catch (error) {
				console.error("error fetching image urls: ", error);
			}
		}
	};

	useEffect(() => {
		const getImages = async () => {
			// Get only the images for the authenticated user
			const token = (await user.getIdToken()) as string;
			const res = await fetch(`/api/images?userOnly=1`, {
				method: "GET",
				headers: new Headers({
					Authorization: token,
				}),
			});
			const data = await res.json();
			setImages(data);
		};
		getImages();
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
			{images.map((imageURL: string, index: number) => (
				<div key={index}>
					<Image
						src={imageURL}
						alt="Picture of bathroom for current user"
						width={200}
						height={200}
						priority={true}
					/>
					<button onClick={() => deleteImage(imageURL)}>
						(click me) Delete image
					</button>
				</div>
			))}
			<Links />
		</div>
	);
};

export default withUser({
	whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
	whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(User);
