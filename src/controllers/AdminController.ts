import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import { CardVerification } from "../models/CardVerification";
import { Student } from "../models/Student";
import { APIError, generatePrivateKeyFromSeed } from "../services/Helpers";
import { createHash, createPrivateKey } from "crypto";

export class AdminController {
	static async fetchAllStudents(
		request: Request,
		response: Response,
		next: NextFunction
	) {
		try {
			const {} = request.body;

			const students = await new Parse.Query(Student).find();

			response.status(200).json(students);
		} catch (e) {
			next(APIError(e));
		}
	}

	static async fetchStudentById(
		request: Request,
		response: Response,
		next: NextFunction
	) {
		try {
			const { id } = request.params;

			const student = await new Parse.Query(Student).get(id);

			response.status(200).json(student);
		} catch (e) {
			next(APIError(e));
		}
	}

	static async fetchStudentVerifications(
		request: Request,
		response: Response,
		next: NextFunction
	) {
		try {
			const { id } = request.params;

			const student = await new Parse.Query(Student).get(id);

			const verifications = await new Parse.Query(CardVerification)
				.equalTo("student", student)
				.find();

			response.status(200).json(verifications);
		} catch (e) {
			next(APIError(e));
		}
	}

	static async createStudent(
		request: Request,
		response: Response,
		next: NextFunction
	) {
		try {
			const { email } = request.body;

			// get the last created student
			const lastStudent = await new Parse.Query(Student)
				.descending("createdAt")
				.first();

			const user = new User();
			user.setUsername(email);
			user.setPassword("test");
			await user.save(request.body);

			const student = new Student();
			student.user = user;
			await student.save({
				...request.body,
				isActive: true,
				privateKey: generatePrivateKeyFromSeed(request.body.studentId),
				blockId: lastStudent.blockId + 1,
				previousBlockHash: lastStudent.blockHash,
				blockHash: generatePrivateKeyFromSeed(
					`${lastStudent.blockId} 1 ${lastStudent.blockHash}`
				),
				size: 1,
				timestamp: new Date().getTime(),
			});

			response.status(200).json(student);
		} catch (e) {
			console.log(e);
			next(APIError(e));
		}
	}

	static async updateStudent(
		request: Request,
		response: Response,
		next: NextFunction
	) {
		try {
			const { id } = request.params;

			const student = await new Parse.Query(Student).get(id);
			await student.save(request.body);

			response.status(200).json(student);
		} catch (e) {
			next(APIError(e));
		}
	}

	static async revokeStudent(request, response, next) {
		try {
			const { id } = request.params;

			const student = await new Parse.Query(Student).get(id);
			student.isActive = false;
			await student.save();

			response.status(200).json(student);
		} catch (e) {
			next(APIError(e));
		}
	}
}
