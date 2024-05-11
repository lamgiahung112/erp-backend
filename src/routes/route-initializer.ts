import { Application } from "express"
import { Component, Autowired } from "@src/decorators/di"
import AuthRoute from "./auth.route"
import OrganizationRoute from "./organization.route"

@Component()
class RouteInitializer {
	@Autowired()
	private authRoute!: AuthRoute

	@Autowired()
	private orgRoute!: OrganizationRoute

	initRoute(app: Application) {
		app.use("/api/auth", this.authRoute.init())
		app.use("/api/organization", this.orgRoute.init())
	}
}

export default RouteInitializer
