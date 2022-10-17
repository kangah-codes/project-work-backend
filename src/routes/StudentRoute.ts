import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { StudentController } from "../controllers/StudentController";

export const studentRouter = Router();

studentRouter
	.post("/auth/login", AuthController.loginStudent)
	.get("/:id", StudentController.fetchStudentById)
	.get("/:id/verifications", StudentController.fetchStudentVerifications);
