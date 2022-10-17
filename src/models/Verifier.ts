import { User } from "./User";

export class Verifier extends Parse.Object {
	constructor(attributes?: any) {
		super("Verifier", attributes);
	}

	static get query(): Parse.Query<Verifier> {
		return new Parse.Query(Verifier);
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
