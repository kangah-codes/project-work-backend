import { Router, Application } from "express";
import { AdminController } from "../controllers/AdminController";
import { validateCreateStudent } from "../validation/TestValidation";

export class AdminRouter {
	static init(app: Application) {
		app.use("/admin", AdminRouter.configureRoutes());
	}

	static configureRoutes(): Router {
		return Router()
			.get("/students", AdminController.fetchAllStudents)
			.get("/students/:id", AdminController.fetchStudentById)
			.get(
				"/students/:id/verifications",
				AdminController.fetchStudentVerifications
			)
			.post(
				"/students",
				validateCreateStudent,
				AdminController.createStudent
			)
			.put("/students/:id", AdminController.updateStudent)
			.post("/students/:id/revoke", AdminController.revokeStudent);
	}
}
