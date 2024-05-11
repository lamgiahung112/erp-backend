import { ApiRequest } from "@requests"
import db from "@src/db"
import bcrypt from "bcrypt"
import { Component } from "@src/decorators/di"
import Service from "./service"

@Component()
class UserService extends Service {
	async createUser(request: ApiRequest.SignUp) {
		return db.users
			.create({
				data: {
					...request,
					password: bcrypt.hashSync(request.password, 12),
				},
				select: {
					id: true,
					email: true,
					fullName: true,
					birthday: true,
					isActive: true,
					username: true,
					password: false,
				},
			})
			.then(
				this.responseMapper.handle({
					messageOnFail: "Failed to create user!",
				})
			)
	}

	async findByUsername(username: string) {
		return db.users
			.findFirst({
				where: {
					username,
				},
			})
			.then(
				this.responseMapper.handle({
					messageOnFail: "Failed to find user!",
				})
			)
	}

	async findByEmail(email: string) {
		return db.users
			.findUnique({
				where: {
					email,
				},
			})
			.then(
				this.responseMapper.handle({
					messageOnFail: "Failed to find user!",
				})
			)
	}
}

export default UserService
