import { Component, Autowired } from "@src/decorators/di"
import { Handler } from "express"
import AuthController from "@src/controllers/auth-controller"
import { ApiRequest } from "@requests"
import JwtController from "@src/controllers/jwt-controller"
import ApiError from "@src/utils/api-error"
import HttpCode from "@src/utils/http-code"

@Component()
class AuthHandler {
	@Autowired()
	private authController!: AuthController

	@Autowired()
	private jwtController!: JwtController

	private DISTANCE_TO_ACTUAL_TOKEN = "Bearer ".length

	SignIn: Handler = async (req, res, next) => {
		try {
			const [user, err] = await this.authController.findUserAndCheckPassword(
				req.body as ApiRequest.SignIn
			)
			if (err !== null) {
				throw err
			}

			const [jwtData, token] = this.jwtController.generateTokenForUser(user!)
			res.locals = {
				payload: {
					user: jwtData,
					token,
				},
			}
			next()
		} catch (error) {
			next(error)
		}
	}

	SignUp: Handler = async (req, res, next) => {
		try {
			const createdUser = await this.authController.createUser(req.body)
			res.locals = {
				payload: createdUser,
			}
			next()
		} catch (error) {
			next(error)
		}
	}

	MapUserDataFromAuthObject: Handler = async (req, res, next) => {
		const authObject = res.locals as AuthObject

		res.locals = {
			payload: {
				user: authObject.authenticatedUser,
				token: authObject.authToken,
			},
		}
		next()
	}

	VerifyUserToken: Handler = (req, res, next) => {
		try {
			const bearerToken = req.headers["authorization"]

			if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
				throw new Error()
			}

			const authToken = bearerToken.substring(this.DISTANCE_TO_ACTUAL_TOKEN)
			const userData = this.jwtController.verifyToken(authToken)

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

	WeaklyVerifyUserToken: Handler = (req, res, next) => {
		try {
			const bearerToken = req.headers["authorization"]

			if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
				throw new Error()
			}

			const authToken = bearerToken.substring(this.DISTANCE_TO_ACTUAL_TOKEN)
			const userData = this.jwtController.verifyToken(authToken)

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
}

export default AuthHandler
