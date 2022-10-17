import Parse from "parse/node";

export class User extends Parse.User {
	constructor(id?: string) {
		super();

		if (id) {
			this.id = id;
		}
	}

	static get query(): Parse.Query<User> {
		return new Parse.Query(User);
	}

	get obId(): string {
		return this.get("objectId");
	}

	set obId(value: string) {
		this.set("objectId", value);
	}

	getData(): void {
		throw new Error("Not implemented");
	}
}
