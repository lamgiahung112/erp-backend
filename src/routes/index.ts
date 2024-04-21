import { Application } from "express"
import authRouter from "./auth.route"
import organizationRouter from "./organization.route"

export default function initRoute(app: Application) {
	app.use("/api/auth", authRouter)
	app.use("/api/organization", organizationRouter)
}
