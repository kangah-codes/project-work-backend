import { Router } from "express";
import { StudentController } from "../controllers/StudentController";

export const studentRouter = Router();

studentRouter
	.get("/:id", StudentController.fetchStudentById)
	.get("/:id/verifications", StudentController.fetchStudentVerifications);
