import { Users } from "@prisma/client"
import jwt from "jsonwebtoken"

export default function generate(data: Users) {
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
