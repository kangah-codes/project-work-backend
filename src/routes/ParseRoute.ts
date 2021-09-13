import path from "path";
import { default as ParseServer } from "parse-server";
import { Application } from "express";
import ParseDashboard from "parse-dashboard";
import Parse from "parse/node";
import { User } from "../models/User";
import parseCache from "parse-cache";

export class ParseRoute {
	static app: Application;

	static init(app: Application) {
		ParseRoute.app = app;

		// parse setup
		const api = new ParseServer({
			databaseURI: process.env.DATABASE_URI, // Connection string for your MongoDB database
			cloud: path.join(__dirname, "..", "cloud", "cloud"), // Absolute path to your Cloud Code
			appId: process.env.APPLICATION_ID,
			masterKey: process.env.MASTER_KEY, // Keep this key secret!
			serverURL: process.env.SERVER_URL || "http://localhost:3200/parse", // Don't forget to change to https if needed
		});

		const dashboard = new ParseDashboard(
			{
				allowInsecureHTTP: true,
				apps: [
					{
						serverURL:
							process.env.SERVER_URL ||
							"http://localhost:3200/parse",
						appId: process.env.APPLICATION_ID,
						masterKey: process.env.MASTER_KEY,
						appName: `APP NAME`,
					},
				],
				users: [
					{
						user: "TEST USER",
						pass: "PASSWORD", // do not deploy with this password
					},
				],
			},
			{ allowInsecureHTTP: true }
		);

		ParseRoute.parseSetup();
		ParseRoute.app.use("/dashboard", dashboard);
		ParseRoute.app.use(process.env.PARSE_MOUNT || "/parse", api.app);
	}

	static parseSetup() {
		Parse.initialize(
			process.env.APPLICATION_ID as string,
			process.env.MASTER_KEY
		);
		// parse caching queries
		parseCache(Parse, process.env.APPLICATION_ID, {
			engine: "memory",
			count: 1000,
		}); // {engine: 'memory', count: 1000} are default values and are optional
		Parse.masterKey = process.env.MASTER_KEY;
		Parse.serverURL =
			process.env.SERVER_URL || "http://localhost:3200/parse";

		Parse.User.registerSubclass("_User", User);
	}
}
