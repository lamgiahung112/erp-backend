import { ApiRequest } from "@requests"
import OrganizationController from "@src/controllers/organization-controller"
import { Autowired, Component } from "@src/decorators/di"
import { AuthObject } from "@types"
import { Handler } from "express"

@Component()
class OrganizationHandler {
	@Autowired()
	private orgController!: OrganizationController

	CreateOrganization: Handler = async (req, res, next) => {
		try {
			const request = req.body as ApiRequest.CreateOrganization
			const authObject = res.locals as AuthObject

			const org = await this.orgController.create(
				request.name,
				authObject.authenticatedUser
			)

			res.locals = {
				payload: org,
			}
		} catch (err) {
			next(err)
		}
	}
}

export default OrganizationHandler
