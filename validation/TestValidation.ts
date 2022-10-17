import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { APIError } from "../src/services/Helpers";

export async function testValidation(
	request: Request,
	_response: Response,
	next: NextFunction
) {
	await Joi.object({
		fieldName: Joi.any(),
	})
		// @ts-ignore
		.validateAsync(request.body)
		.then(() => next())
		.catch((e) => next(APIError(e, 400)));
}

export async function validateCreateStudent(
	request: Request,
	_response: Response,
	next: NextFunction
) {
	await Joi.object({
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
		otherNames: Joi.string(),
		picture: Joi.string().required(),
		dateOfIssue: Joi.date().required(),
		dateOfExpiry: Joi.date().required(),
		studentProgramme: Joi.string().required(),
		studentId: Joi.string().required(),
		email: Joi.string()
			.email()
			.required(),
	})
		.validateAsync(request.body)
		.then(() => next())
		.catch((e) => next(APIError(e, 400)));
}
