import { Employees } from "@prisma/client"
import jwt from "jsonwebtoken"

export default function generate(data: Employees) {
	const mappedData = {
		id: data.id,
		fullName: data.fullName,
		title: data.title,
		username: data.username,
	}

	return [
		mappedData,
		jwt.sign(mappedData, process.env.JWT_SECRET, {
			expiresIn: process.env.JWT_EXPIRES,
		}),
	] as const
}
