import initAuth from "@/utils/initAuth";
initAuth();

const User = () => {
	const uploadImage = async (f: any) => {
		const file = f.target.files[0];
		const filename = encodeURIComponent(file.name);
		const res = await fetch(`/api/images?file=${filename}`);
		const { url, fields } = await res.json();
		console.log("url, fields", url, fields);

		const formData = new FormData();
		Object.entries({ ...fields, file }).forEach(([key, value]) => {
			// @ts-ignore
			formData.append(key, value);
		});

		await fetch(url, {
			method: "POST",
			headers: new Headers({ "content-type": "image/png" }),
			body: formData,
			mode: "no-cors",
		});
	};

	return (
		<div>
			<div>User page</div>
			<p>Upload a .png or .jpg image</p>
			<input
				onChange={uploadImage}
				type="file"
				accept="image/png, image/jpeg"
			/>
		</div>
	);
};

export default User;
