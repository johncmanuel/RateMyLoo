import { useUser, withUser, AuthAction } from "next-firebase-auth";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import Image from "next/image";
import Footer from "../components/Footer";
import '../styles/style.module.css';
import { authFetch } from "@/utils/authFetch";
import DarkModeToggler from "../components/DarkModeToggler";
//import { toggleDarkMode } from '../components/darkModeSlice';
//import DarkModeToggle from "../components/DarkModeToggle";


const User = () => {
	const user = useUser();
	const [isUploaded, setIsUploaded] = useState(false);
	const [name, setName] = useState("");
	const [images, setImages] = useState<string[]>([]);
	const IMAGES_LIMIT = 5; // this will be an env variable in the future


	// See full list of file type extensions for images:
	// https://www.iana.org/assignments/media-types/media-types.xhtml#image
	// This will also be an env variable in the future
	const fileExtensions = ["png", "jpg", "webp", "jpeg"]; //this is the format of the file 

	const mimeTypes = fileExtensions.map((extension) => `image/${extension}`);
	const acceptedInput = mimeTypes.join(", ");

	const fetchUserImagesUrls = async (token: string) => {
		try {
			const imagesURLs = await authFetch("/api/images?userOnly=1", token);
			const data = await imagesURLs.json();
			return data;
		} catch (error) {
			console.error("error fetching image urls: ", error);
		}
	};

	  

	  

	// Uploads only 1 image at a time
	// TODO: May want to limit amount of pictures user can
	// upload (probably around 5)
	const uploadImage = async (f: any) => {
		const file = f.target.files[0];
		const filename = `images/bathroomPictures/${user.id}/${file.name}`;
		const uriFilename = encodeURIComponent(filename);

		// Pretty clean way to get the string of a file extension:
		// https://stackoverflow.com/a/4695156
		const fileExt = file.name.split(".").pop();

		// Exclude user.id when showing name of file to user
		setName(file.name);

		const token = (await user.getIdToken()) as string;

		// For better optimzation techniques on fetching, see:
		// https://github.com/gladly-team/next-firebase-auth/blob/2c8f771e7ca286063b1b0afea9b8796832550728/example/pages/static-auth-required-loader.js#L21
		const res = await fetch(`/api/images?file=${uriFilename}`, {
			method: "POST",
			headers: new Headers({
				"content-type": `image/${fileExt}`,
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
			const data = await fetchUserImagesUrls(token);
			setImages(data);
		}
	};
	// pages/index.js
	
	


	// Delete an image given the name of the image.
	// Might need to make images interactable and delete
	// them given the name of the image
	const deleteImage = async (imgUrl: string) => {
		// Example imgURL:
		// https://storage.googleapis.com/xxx.appspot.com/images/bathroomPictures/123456789/img.jpg
		const urlSegments = imgUrl.split("/");
		const token = (await user.getIdToken()) as string;
		const filename = urlSegments[urlSegments.length - 1];

		const res = await authFetch(
			`/api/images?file=${filename}`,
			token,
			"DELETE"
		);

		if (res.ok) {
			const token = (await user.getIdToken()) as string;
			const data = await fetchUserImagesUrls(token);
			setImages(data);
		}
	};

	

	//This can be replace by others but this is will show the user information to see
	//const UserPage = ({ userEmail }) => { //useremail might have to be replace to firebaseauth
	//	const [displayEmail, setDisplayEmail] = useState(false);
	//
	//	const handleButtonClick = () => {
	//		setDisplayEmail(true);
	//	}
	//}
	//End of statement

	useEffect(() => {

		//const applyDarkMode = (darkMode: boolean) => {
			//const root = window.document.documentElement;
			//root.classList.toggle('dark', darkMode);
		//};
		// Load user's images upon entering page
		const im = async () => {
			const token = (await user.getIdToken()) as string;
			const data = await fetchUserImagesUrls(token);
			setImages(data);
		};
		im();	
		// eslint-disable-next-line react-hooks/exhaustive-deps
		
		
	}, 
	[]);
	
	
	return (
		
		
		<div className="min-h-screen dark:bg-gray-900"  >
			<DarkModeToggler />
			
				<div className="h-20">
					<nav className="flex justify-between bordera p-8">
						<Image src="/hero2.jpeg" alt="logo" width={165} height={500} 
						style={{ position: 'relative', bottom: '20px', right: '30px' }} />
						<ul className="flex space-x-8 text-teal-500">
							<li>
								<a href="/">Home</a>
							</li>
							<li>
								<a href="/loo">Loo Page</a>
								</li>
							<li>
								<a href="/user">
									User Page
								</a>
							</li>
							<li>
								<a href="/auth">
									Login page
								</a>
							</li>
						</ul>
					</nav>
				</div>

				<div style={{ borderTop: "2px solid #fff ",marginTop: 20 }}>

				</div>


				<Header email={user.email} signOut={user.signOut} />
				
				

				
				<div
					className="flex-1 pt-36 padding-x gradient-bg"
					style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					marginTop: '100px' // Adjust the margin value as needed
					}}
				>
				
					<h1 className="border-4 border-black-100 w-full h-100 p-10 text-center font-custom" style={{fontFamily: 'Times New Roman', color: 'teal', fontSize: '24px'}}>
						This is the user page
					</h1>
				</div>

			

			
			

			<div style={{ display: 'flex' }}>
				<p className="m-2 p-2 rounded-lg border-2 border-blue-200 bg-blue-100 font-custom" style={{ width: '50%', marginRight: '10px', fontFamily: 'Times New Roman', color: 'teal' }}>
				User Information :
				{user ? (
          			<span>
            			<br />
            			Email: {user.email} {/* Display the user's email */}
          			</span>
        		)	: (
          			<span>No user signed in</span>
        		)}
				</p>
				
			

				<p className="m-2 p-2 rounded-lg border-2 border-blue-200 bg-blue-100 font-custom" style={{ width: '50%', fontFamily: 'Times New Roman', color: 'teal' }}>
				Previous History : <a href="/loo">Press Here</a>
				</p>
			</div>


			


				{images.length >= IMAGES_LIMIT ? (
					<div>
						you cannot upload any more images (limit is {IMAGES_LIMIT}{" "}
						images)
					
					</div>
				) : (
					<div className="m-2 p-2 rounded-lg border-2 border-blue-200 bg-gray-200" style={{color: 'teal'}}>
						<p>Upload a .png or .jpg image</p>
						{/* See /api/images.ts in POST case. */}
						<p>File must be less than 10 megabytes</p>
						<div>
							you may upload {IMAGES_LIMIT - images.length} more
							images
						</div>
						<input
							onChange={uploadImage}
							type="file"
							// accept="image/png, image/jpeg"
							accept={acceptedInput}
						/>
					</div>
				)}
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
						<div></div>
						<button onClick={async () => await deleteImage(imageURL)}>
							(click me) Delete image
						</button>
					</div>
				))}
			
			<Footer />
			

		</div>	
			
			
		);
	};

	export default withUser({
		whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
		whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
	})(User);


	//potneially add footer