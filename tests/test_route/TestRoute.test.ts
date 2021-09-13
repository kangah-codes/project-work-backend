import supertest from "supertest";
import app from "../../src/server";

const request = supertest(app);

jest.setTimeout(3000);

describe("All tests for testroute", () => {
	it("Call the test endpoint", async (done) => {
		const res = await request.get("/test");

		expect(res.status).toBe(200);

		done();
	});
});
