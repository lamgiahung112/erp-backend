import signIn from "./sign-in"
import signUp from "./sign-up"

const authController = {
	signUp,
	signIn,
} as const

export default authController
