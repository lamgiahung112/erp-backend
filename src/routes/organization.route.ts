import { Component, Autowired } from "@src/decorators/di"
import AuthHandler from "@src/handlers/auth-handler"
import express from "express"
import AppRoute from "./app.route"
import OrganizationHandler from "@src/handlers/organization-handler"

@Component()
class OrganizationRoute extends AppRoute {
	private organizationRouter = express.Router()

	@Autowired()
	private orgHandler!: OrganizationHandler

	@Autowired()
	private authHandler!: AuthHandler

	override init() {
		this.organizationRouter.post(
			"/",
			this.authHandler.VerifyUserToken,
			this.orgHandler.CreateOrganization
		)
		return this.organizationRouter
	}
}

export default OrganizationRoute
