import { Handler } from "express"
import HttpCode from "@src/utils/http-code"
import ApiError from "@src/utils/api-error"
import jwtController from "@src/controllers/jwt"

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
