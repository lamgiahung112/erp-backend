import jwt from "jsonwebtoken"
import { AuthenticatedUserData } from "."

export default function verify(token: string) {
	const userData = jwt.verify(token, process.env.JWT_SECRET) as AuthenticatedUserData
	return userData
}
