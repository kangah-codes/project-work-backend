import { Request, Response, NextFunction } from "express";
import { User } from "parse";
import { Student } from "../models/Student";
import { APIError } from "../services/Helpers";

export class AuthController {
	static async loginStudent(request, response, next) {
		try {
			const { username, password } = request.body;

			const user = await Student.login({ username, password });
			console.log(user);
			const student = await new Parse.Query(Student)
				.equalTo("userId", user.id)
				.first();
			console.log(student);

			if (student) {
				response.json({
					student: student.toJSON(),
					user: user.toJSON(),
				});
			} else {
				throw APIError("Invalid credentials", 401);
			}
		} catch (e) {
			console.log(e);
			next(APIError(e));
		}
	}
}
