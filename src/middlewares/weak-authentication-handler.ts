import jwtController from "@src/controllers/jwt"
import { Handler } from "express"

const WeakAuthenticationHandler: Handler = (req, res, next) => {
	try {
		const bearerToken = req.headers["authorization"]

		if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
			return next()
		}

		const authToken = bearerToken.substring(7)
		const userData = jwtController.verify(authToken)

		res.locals = {
			authenticatedUser: userData,
		}
		next()
	} catch {
		next()
	}
}

export default WeakAuthenticationHandler
