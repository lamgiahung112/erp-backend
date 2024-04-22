import { ApiRequest } from "@requests"
import organizationController from "@src/controllers/organization"
import { AuthObject } from "@src/middlewares/authentication-handler"
import ApiError from "@src/utils/api-error"
import HttpCode from "@src/utils/http-code"
import { Handler } from "express"

const GetMemberListHandler: Handler = async (req, res, next) => {
	try {
		const authObject = res.locals as AuthObject
		const { organizationId, page, pageSize } =
			req.query as unknown as ApiRequest.GetMemberList

		const memberExists = await organizationController.findMember({
			orgId: organizationId,
			userId: authObject.authenticatedUser.id,
		})

		if (!memberExists) {
			throw new Error("Operation not Allowed!")
		}

		res.locals = {
			payload: await organizationController.getMemberList({
				orgId: organizationId,
				page: +page,
				pageSize: +pageSize,
			}),
		}
		next()
	} catch (error) {
		next(new ApiError((error as Error).message, HttpCode.BAD_REQUEST))
	}
}

export default GetMemberListHandler
