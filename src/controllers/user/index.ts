import findUserByEmail from "./find-by-email"

const userController = {
	findByEmail: findUserByEmail,
} as const

export default userController
