import { Handler } from "express"
import HttpCode from "@src/utils/http-code"
import ApiError from "@src/utils/api-error"
import jwtController, { AuthenticatedUserData } from "@src/controllers/jwt"

type AuthObject = {
	authenticatedUser: AuthenticatedUserData
	authToken: string
}

export type { AuthObject }

const AuthenticationHandler: Handler = (req, res, next) => {
	try {
		const bearerToken = req.headers["authorization"]

		if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
			throw new Error()
		}

		const authToken = bearerToken.substring(7)
		const userData = jwtController.verify(authToken)

		res.locals = {
			authenticatedUser: userData,
			authToken,
		}
		next()
	} catch {
		next(
			new ApiError(
				"You are not allowed to access this feature!",
				HttpCode.UNAUTHORIZED
			)
		)
	}
}

export default AuthenticationHandler
