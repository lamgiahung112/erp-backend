import { Request } from "@requests"
import authController from "@src/controllers/auth"
import ApiError from "@src/utils/api-error"
import HttpCode from "@src/utils/http-code"
import { Handler } from "express"

const SignUpHandler: Handler = async (req, res, next) => {
	try {
		const data = await authController.signUp(req.body as Request.SignUp)

		res.locals = {
			payload: data,
		}
		next()
	} catch (error) {
		next(new ApiError("Couldn't sign you up!", HttpCode.BAD_REQUEST))
	}
}

export default SignUpHandler
