import { User } from "./User";

export class Admin extends Parse.Object {
	constructor(attributes?: any) {
		super("Admin", attributes);
	}

	get user(): User {
		return this.get("user");
	}

	set user(value: User) {
		this.set("user", value);
	}

	get fullName(): string {
		return this.get("fullName");
	}

	set fullName(value: string) {
		this.set("fullName", value);
	}
}
