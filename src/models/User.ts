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

	getData(): void {
		throw new Error("Not implemented");
	}
}
