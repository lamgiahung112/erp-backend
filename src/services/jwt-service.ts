import { Users } from "@prisma/client"
import { Component } from "@src/decorators/di"
import jwt from "jsonwebtoken"

@Component()
class JwtService {
	generate(data: Users) {
		const mappedData = {
			id: data.id,
			isActive: data.isActive,
			fullName: data.fullName,
			username: data.username,
		}

		return [
			mappedData,
			jwt.sign(mappedData, process.env.JWT_SECRET, {
				expiresIn: process.env.JWT_EXPIRES,
			}),
		] as const
	}

	verify(token: string) {
		const userData = jwt.verify(
			token,
			process.env.JWT_SECRET
		) as AuthenticatedUserData
		return userData
	}
}

export default JwtService
