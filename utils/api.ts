export async function postJwt(path: string, token: string) {
	// const url = BACKEND_URL + path;
	const res: Response = await fetch(path, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		credentials: "include",
		body: JSON.stringify("body here"),
	});
	console.log("headers:", res.headers);
	return res.json();
}

// export async function fetchJson(path: string) {
// 	// const url = BACKEND_URL + path
// 	const response_raw = await fetch(path, {
// 		credentials: "include",
// 	});
// 	return await response_raw.json();
// }
