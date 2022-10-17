import { NextFunction, Request, Response } from "express";
import { CardVerification } from "../models/CardVerification";
import { Student } from "../models/Student";
import { User } from "../models/User";
import { APIError } from "../services/Helpers";

export class StudentController {
	static async fetchAllStudents(request, response, next) {
		try {
			const {} = request.body;

			const students = await new Parse.Query(Student).find();

			response.status(200).json(students);
		} catch (e) {
			next(APIError(e));
		}
	}

	static async fetchStudentById(request, response, next) {
		try {
			const { id } = request.params;

			const student = await new Parse.Query(Student).get(id);

			response.status(200).json(student);
		} catch (e) {
			next(APIError(e));
		}
	}

	static async fetchStudentVerifications(request, response, next) {
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
}

export function hello() {
    return "THIS"
}