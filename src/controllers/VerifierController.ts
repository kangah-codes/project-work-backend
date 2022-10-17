import { Request, Response, NextFunction } from "express";
import { CardVerification } from "../models/CardVerification";
import { Student } from "../models/Student";
import { APIError } from "../services/Helpers";

export class VerifierController {
	static async verifyStudent(request, response, next) {
		try {
			const { studentId } = request.body;

			const student = await new Parse.Query(Student).get(studentId);

			const verifications = await new Parse.Query(CardVerification)
				.equalTo("student", student)
				.find();

			response.status(200).json(verifications);
		} catch (e) {
			next(APIError(e));
		}
	}
}
