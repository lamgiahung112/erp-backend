import { ApiRequest } from "@requests"
import db from "@src/db"
import bcrypt from "bcrypt"
import { Component } from "@src/decorators/di"

@Component()
class UserService {
	async createUser(request: ApiRequest.SignUp) {
		return db.users.create({
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
	}

	async findByUsername(username: string) {
		return db.users.findFirst({
			where: {
				username,
			},
		})
	}

	async findByEmail(email: string) {
		return db.users.findUnique({
			where: {
				email,
			},
		})
	}
}

export default UserService
