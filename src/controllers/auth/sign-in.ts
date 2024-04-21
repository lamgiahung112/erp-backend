import { Request } from "@requests"
import bcrypt from "bcrypt"
import db from "@src/db"

export default async function signIn(request: Request.SignIn) {
	return db.users
		.findFirst({
			where: {
				username: request.username,
			},
		})
		.then((user) => {
			if (user && bcrypt.compareSync(request.password, user.password)) {
				return user
			}
			throw new Error("Wrong username or password!")
		})
}
