/*
This is the file which has the server object which is to be exported
*/
import "dotenv/config";
import cors from "cors";
import debug from "debug";
import Parse from "parse/node";
import express, { Application } from "express";
import { errorHandler } from "./services/Helpers";
import { ParseRoute } from "./routes/ParseRoute";

const app: Application = express();
const port = process.env.PORT || 3200;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("morgan")("dev"));
app.get("/test", (_request, response) => {
	response.status(200).send("Route is working!");
});

ParseRoute.init(app);

app.use(errorHandler);
app.listen(port, () => {
	debugLog(`Server running at http://localhost:${port}`);
	console.log(`Server running at http://localhost:${port}`);
});

export default app;
export const debugLog: debug.IDebugger = debug("app");
