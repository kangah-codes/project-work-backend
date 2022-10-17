import { Student } from "./Student";

export class CardVerification extends Parse.Object {
	constructor(attributes?: any) {
		super("CardVerification", attributes);
	}

	static get query(): Parse.Query<CardVerification> {
		return new Parse.Query(CardVerification);
	}

	get studentId(): string {
		return this.get("studentId");
	}

	set studentId(value: string) {
		this.set("studentId", value);
	}

	get purpose(): string {
		return this.get("purpose");
	}

	set purpose(value: string) {
		this.set("purpose", value);
	}

	get timeStamp(): string {
		return this.get("createdAt");
	}

	set timeStamp(value: string) {
		this.set("createdAt", value);
	}

	get status(): string {
		return this.get("status");
	}

	set status(value: string) {
		this.set("status", value);
	}
}
