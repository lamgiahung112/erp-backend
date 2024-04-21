import { ApiRequest } from "@requests"
import organizationController from "@src/controllers/organization"
import { AuthObject } from "@src/middlewares/authentication-handler"
import ApiError from "@src/utils/api-error"
import HttpCode from "@src/utils/http-code"
import { Handler } from "express"

const RespondToInvitationHandler: Handler = async (req, res, next) => {
	try {
		const authObject = res.locals as AuthObject
		const { organizationId, accepted } = req.body as ApiRequest.RespondToInvitation

		await organizationController.respondToInvitation({
			accepted,
			invitedUserId: authObject.authenticatedUser.id,
			orgId: organizationId,
		})

		next()
	} catch (error) {
		next(new ApiError((error as Error).message, HttpCode.BAD_REQUEST))
	}
}

export default RespondToInvitationHandler
