import { Request } from "@requests"
import authController from "@src/controllers/auth"
import jwtController from "@src/controllers/jwt"
import ApiError from "@src/utils/api-error"
import HttpCode from "@src/utils/http-code"
import { Handler } from "express"

const SignInHandler: Handler = async (req, res, next) => {
	try {
		const data = await authController.signIn(req.body as Request.SignIn)
		const [user, token] = jwtController.generate(data)
		res.locals = {
			payload: {
				user,
				token,
			},
		}
		next()
	} catch (error) {
		next(new ApiError("Username or password is incorrect!", HttpCode.BAD_REQUEST))
	}
}

export default SignInHandler
