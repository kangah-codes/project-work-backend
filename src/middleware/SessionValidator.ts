import Parse from "parse/node";
import { User } from "../models/User";
import { APIError } from "../services/Helpers";
import { NextFunction, Request, Response } from "express";

export const validateSessionToken = async (
	req: Request,
	_res: Response,
	next: NextFunction
) => {
	try {
		const session = await new Parse.Query("_Session")
			// @ts-ignore
			.cache(360)
			.equalTo("sessionToken", req.header("sessionToken"))
			.first({ useMasterKey: true });

		if (!session) {
			throw APIError("Invalid session token", 403);
		}

		const user = await User.query
			// @ts-ignore
			.cache(360)
			.get((session.get("user") as User).id)
			.catch((e) => {
				throw APIError(`Invalid session token: ${e}`, 403);
			});

		req.body.user = user;
		next();
	} catch (e) {
		next(APIError(e));
	}
};
