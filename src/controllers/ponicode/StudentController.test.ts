import * as StudentController from "../StudentController";
// @ponicode
describe("StudentController.StudentController.fetchStudentVerifications", () => {
	test("0", async () => {
		let object: any = [
			[false, true, true, false],
			[false, false, true, false],
			[false, true, false, false],
			[true, true, false, false],
		];
		await StudentController.StudentController.fetchStudentVerifications(
			{ params: object },
			{ status: () => 404 },
			true
		);
	});

	test("1", async () => {
		let object: any = [
			[false, true, true, true],
			[false, false, true, false],
			[true, true, true, false],
			[true, false, true, true],
		];
		await StudentController.StudentController.fetchStudentVerifications(
			{ params: object },
			{ status: () => 200 },
			false
		);
	});

	test("2", async () => {
		let object: any = [
			[true, false, false, false],
			[false, true, false, false],
			[false, false, true, false],
			[true, false, true, true],
		];
		await StudentController.StudentController.fetchStudentVerifications(
			{ params: object },
			{ status: () => 404 },
			false
		);
	});

	test("3", async () => {
		let object: any = [
			[true, true, true, true],
			[true, false, false, false],
			[true, false, true, true],
			[false, false, false, false],
		];
		await StudentController.StudentController.fetchStudentVerifications(
			{ params: object },
			{ status: () => 404 },
			false
		);
	});

	test("4", async () => {
		let object: any = [
			[false, false, false, false],
			[true, false, false, true],
			[false, false, false, false],
			[false, true, false, false],
		];
		await StudentController.StudentController.fetchStudentVerifications(
			{ params: object },
			{ status: () => 404 },
			true
		);
	});

	test("5", async () => {
		await StudentController.StudentController.fetchStudentVerifications(
			{ params: [] },
			{ status: () => Infinity },
			false
		);
	});
});
