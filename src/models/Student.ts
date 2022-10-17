import { User } from "./User";

export class Student extends Parse.Object {
	constructor(attributes?: any) {
		super("Student", attributes);
	}

	static get query(): Parse.Query<Student> {
		return new Parse.Query(Student);
	}

	get user(): User {
		return this.get("user");
	}

	set user(value: User) {
		this.set("user", value);
	}

	get firstName(): string {
		return this.get("firstName");
	}

	set firstName(value: string) {
		this.set("firstName", value);
	}

	get lastName(): string {
		return this.get("lastName");
	}

	set lastName(value: string) {
		this.set("lastName", value);
	}

	get otherNames(): string {
		return this.get("otherNames");
	}

	set otherNames(value: string) {
		this.set("otherNames", value);
	}

	get picture(): string {
		return this.get("picture");
	}

	set picture(value: string) {
		this.set("picture", value);
	}

	get privateKey(): string {
		return this.get("privateKey");
	}

	set privateKey(value: string) {
		this.set("privateKey", value);
	}

	get blockId(): string {
		return this.get("blockId");
	}

	set blockId(value: string) {
		this.set("blockId", value);
	}

	get blockHash(): string {
		return this.get("blockHash");
	}

	set blockHash(value: string) {
		this.set("blockHash", value);
	}

	get previousBlockHash(): string {
		return this.get("previousBlockHash");
	}

	set previousBlockHash(value: string) {
		this.set("previousBlockHash", value);
	}

	get size(): number {
		return this.get("size");
	}

	set size(value: number) {
		this.set("size", value);
	}

	get timestamp(): string {
		return this.get("createdAt");
	}

	set timestamp(value: string) {
		this.set("createdAt", value);
	}

	get dateOfIssue(): string {
		return this.get("dateOfIssue");
	}

	set dateOfIssue(value: string) {
		this.set("dateOfIssue", value);
	}

	get dateOfExpiry(): string {
		return this.get("dateOfExpiry");
	}

	set dateOfExpiry(value: string) {
		this.set("dateOfExpiry", value);
	}

	get studentProgramme(): string {
		return this.get("studentProgramme");
	}

	set studentProgramme(value: string) {
		this.set("studentProgramme", value);
	}

	get studentId(): string {
		return this.get("studentId");
	}

	set studentId(value: string) {
		this.set("studentId", value);
	}

	get isActive(): boolean {
		return this.get("isActive");
	}

	set isActive(value: boolean) {
		this.set("isActive", value);
	}

	get userId(): string {
		return this.get("userId");
	}

	set userId(value: string) {
		this.set("userId", value);
	}

	static async login({ username, password }) {
		return await User.logIn(username, password);
	}
}
