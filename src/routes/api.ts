import { Router } from "express";
import { AdminRouter } from "./AdminRouter";
import { studentRouter } from "./StudentRoute";

export const API = Router();

API.use("/student", studentRouter).use("/admin", AdminRouter.configureRoutes());
