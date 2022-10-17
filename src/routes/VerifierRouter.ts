import { Router, Application } from "express";
import { VerifierController } from "../controllers/VerifierController";

export class VerifierRouter {
	static init(app: Application) {
		app.use("/verifier", VerifierRouter.configureRoutes());
	}

	static configureRoutes(): Router {
		return Router().get("/student/:id", VerifierController.verifyStudent);
	}
}
