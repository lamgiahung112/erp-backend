import { Request } from "@requests"
import db from "@src/db"
import bcrypt from "bcrypt"

export default async function signUp(request: Request.SignUp) {
	return db.users.create({
		data: {
			...request,
			password: bcrypt.hashSync(request.password, 12),
		},
	})
}
