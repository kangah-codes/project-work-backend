import { NextFunction } from "express";

export function APIError(
	error: string | Error | any,
	status: number = 500
): Error {
	let err: Error;

	if (typeof error === "string") {
		err = new Error(error);
	} else {
		err = error;
	}

	// @ts-ignore
	if (err.status == null) {
		// @ts-ignore
		err.status = status;
	}

	return err;
}

export function getStandardResponse(
	status: boolean,
	data: string | Object | Array<any> | null,
	message: string
): { status: boolean; data: string | Object | any[]; message: string } {
	return {
		status: status,
		data: data,
		message: message,
	};
}

export const errorHandler = (
	err: Error,
	_req: Request,
	res: Response,
	_next: NextFunction
) => {
	// @ts-ignore
	res.status(err.status).send(err.message);
};
