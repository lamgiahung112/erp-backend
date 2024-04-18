import ApiError from "@src/utils/api-error"
import HttpCode from "@src/utils/http-code"
import { Handler } from "express"

const VerifyHandler: Handler = async (req, res, next) => {
	try {
		res.locals = {
			payload: res.locals.authenticatedUser,
		}
		next()
	} catch (error) {
		next(new ApiError("Username or password is incorrect!", HttpCode.BAD_REQUEST))
	}
}

export default VerifyHandler
