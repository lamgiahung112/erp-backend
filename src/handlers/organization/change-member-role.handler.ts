import { ApiRequest } from "@requests"
import organizationController from "@src/controllers/organization"
import userController from "@src/controllers/user"
import { AuthObject } from "@src/middlewares/authentication-handler"
import ApiError from "@src/utils/api-error"
import HttpCode from "@src/utils/http-code"
import { Handler } from "express"

const ChangeMemberRoleHandler: Handler = async (req, res, next) => {
	try {
		const authObject = res.locals as AuthObject
		const { memberUserId, role, organizationId } =
			req.body as ApiRequest.ChangeMemberRole

		const member = await organizationController.findMember({
			orgId: organizationId,
			userId: memberUserId,
		})
		if (member === null) {
			throw new Error("This user is not in this organization")
		}

		const requestMaker = await organizationController.findMember({
			orgId: organizationId,
			userId: authObject.authenticatedUser.id,
		})
		if (requestMaker === null || requestMaker.role !== "Owner") {
			throw new Error(
				"You are not allowed to change this organization's members' roles!"
			)
		}

		await organizationController.changeMemberRole({
			orgId: organizationId,
			role,
			userId: memberUserId,
		})

		next()
	} catch (error) {
		next(new ApiError((error as Error).message, HttpCode.BAD_REQUEST))
	}
}

export default ChangeMemberRoleHandler
