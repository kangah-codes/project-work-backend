import { User } from "./User";

export class Admin extends Parse.Object {
	constructor(attributes?: any) {
		super("Admin", attributes);
	}

	static get query(): Parse.Query<Admin> {
		return new Parse.Query(Admin);
	}

	get userId(): string {
		return this.get("userId");
	}

	set userId(value: string) {
		this.set("userId", value);
	}

	get fullName(): string {
		return this.get("fullName");
	}

	set fullName(value: string) {
		this.set("fullName", value);
	}
}
