import db from "@src/db"

export default async function findUserByEmail(email: string) {
	return db.users.findUnique({
		where: {
			email,
		},
	})
}
