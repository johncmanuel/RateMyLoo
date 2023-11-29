import { test, expect } from "@playwright/test";

// Reset storage state for this file to avoid being authenticated
test.use({ storageState: { cookies: [], origins: [] } });

test("Unauthorized access to restricted API endpoints using GET", async ({
	request,
}) => {
	const res1 = await request.get("/api/images");
	expect(res1.status() === 403);
	const res2 = await request.get("/api/firestore");
	expect(res2.status() === 403);
});

test("Unauthorized access to restricted API endpoints using POST", async ({
	request,
}) => {
	const dummy = {
		title: "dummy",
		body: "data",
	};
	const res1 = await request.post("/api/images", { data: dummy });
	expect(res1.status() === 403);
	const res2 = await request.post("/api/firestore", { data: dummy });
	expect(res2.status() === 403);
});
