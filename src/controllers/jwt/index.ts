import generate from "./generate"
import verify from "./verify"

type AuthenticatedUserData = {
	id: string
	fullName: string
	isActive: boolean
	username: string
	iat: number
	exp: number
}

const jwtController = {
	generate,
	verify,
} as const

export type { AuthenticatedUserData }
export default jwtController
