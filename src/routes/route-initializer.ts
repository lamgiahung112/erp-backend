import { Application } from "express"
import { Component, Autowired } from "@src/decorators/di"
import AuthRoute from "./auth.route"

@Component()
class RouteInitializer {
	@Autowired()
	private authRoute!: AuthRoute

	initRoute(app: Application) {
		app.use("/api/auth", this.authRoute.init())
	}
}

export default RouteInitializer
