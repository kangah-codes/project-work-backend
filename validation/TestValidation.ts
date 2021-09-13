import Joi from "joi";
import { APIError } from "../services/Helpers";
import { Request, Response, NextFunction } from "express";

export async function testValidation(
	request: Request,
	_response: Response,
	next: NextFunction
) {
	await Joi.object({
		fieldName: Joi.any(),
	})
		.validateAsync(request.body)
		.then(() => next())
		.catch((e) => next(APIError(e, 400)));
}
