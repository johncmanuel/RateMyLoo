import { testAuth } from "./fixtures/auth.fixture";
import { test, expect } from "@playwright/test";

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

testAuth(
	"Authorized access restricted API endpoints using GET",
	async ({ request }) => {
		const res1 = await request.get("/api/images");
		expect(res1.status() === 400);
		const res2 = await request.get("/api/firestore");
		expect(res2.status() === 400);

		const res3 = await request.get("/api/images?userOnly=1");
		expect(res3.status() === 200);
		const res4 = await request.get("/api/images=notFromUser=1");
		expect(res4.status() === 200);
	}
);

testAuth(
	"Authorized access restricted API endpoints using POST",
	async ({ request }) => {
		// No need to test if file uploads work, just test if
		// the endpoints are working as intended.
		const dummy = {
			title: "dummy",
			body: "data",
		};
		const res1 = await request.post("/api/images", { data: dummy });
		expect(res1.status() === 400);
		const res2 = await request.post("/api/firestore", { data: dummy });
		expect(res2.status() === 400);

		const res3 = await request.post("/api/images?userOnly=1");
		expect(res3.status() === 400);
		const res4 = await request.post("/api/images=notFromUser=1");
		expect(res4.status() === 400);
	}
);
