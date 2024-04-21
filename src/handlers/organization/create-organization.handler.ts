import { ApiRequest } from "@requests"
import organizationController from "@src/controllers/organization"
import { AuthObject } from "@src/middlewares/authentication-handler"
import ApiError from "@src/utils/api-error"
import HttpCode from "@src/utils/http-code"
import { Handler } from "express"

const CreateOrganizationHandler: Handler = async (req, res, next) => {
	try {
		const authObject = res.locals as AuthObject
		const { name } = req.body as ApiRequest.CreateOrganization

		const data = await organizationController.create(
			name,
			authObject.authenticatedUser
		)

		await organizationController.addMember({
			orgId: data.id,
			userId: authObject.authenticatedUser.id,
			role: "Admin",
		})

		res.locals = {
			payload: data,
		}
		next()
	} catch (error) {
		next(new ApiError((error as Error).message, HttpCode.BAD_REQUEST))
	}
}

export default CreateOrganizationHandler
