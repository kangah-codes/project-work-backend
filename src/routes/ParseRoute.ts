import path from "path";
import { default as ParseServer } from "parse-server";
import { Application } from "express";
import ParseDashboard from "parse-dashboard";
import Parse from "parse/node";
import { User } from "../models/User";
import parseCache from "parse-cache";
import { Admin } from "../models/Admin";
import { Verifier } from "../models/Verifier";
import { Student } from "../models/Student";
import { CardVerification } from "../models/CardVerification";

export class ParseRoute {
	static app: Application;

	static init(app: Application) {
		ParseRoute.app = app;

		// parse setup
		const api = new ParseServer({
			databaseURI:
				"mongodb+srv://webtech:webtech@cluster0.etoko.mongodb.net/?retryWrites=true&w=majority", // Connection string for your MongoDB database
			cloud: "./cloud/cloud", // Absolute path to your Cloud Code
			appId: "finalProject",
			masterKey: "masterKey", // Keep this key secret!
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
						appId: "finalProject",
						masterKey: "masterKey",
						appName: `UG eID`,
					},
				],
				users: [
					{
						user: "admin",
						pass: "password", // do not deploy with this password
					},
				],
			},
			{ allowInsecureHTTP: true }
		);

		ParseRoute.parseSetup();
		ParseRoute.app.use("/dashboard", dashboard);
		ParseRoute.app.use("/parse", api.app);
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
		Parse.Object.registerSubclass("Admin", Admin);
		Parse.Object.registerSubclass("Verifier", Verifier);
		Parse.Object.registerSubclass("Student", Student);
		Parse.Object.registerSubclass("CardVerification", CardVerification);
	}
}
