import jwt from "jsonwebtoken"

type AuthenticatedUserData = {
	id: string
	fullName: string
	title: string
	username: string
	iat: number
	exp: number
}

export default function verify(token: string) {
	const userData = jwt.verify(token, process.env.JWT_SECRET) as AuthenticatedUserData
	return userData
}
