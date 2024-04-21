import { AuthObject } from "@src/middlewares/authentication-handler"
import ApiError from "@src/utils/api-error"
import HttpCode from "@src/utils/http-code"
import { Handler } from "express"

const VerifyHandler: Handler = async (req, res, next) => {
	try {
		const authObject = res.locals as AuthObject

		res.locals = {
			payload: {
				user: authObject.authenticatedUser,
				token: authObject.authToken,
			},
		}
		next()
	} catch (error) {
		next(new ApiError("Username or password is incorrect!", HttpCode.BAD_REQUEST))
	}
}

export default VerifyHandler
