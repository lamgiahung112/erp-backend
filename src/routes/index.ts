import { Application } from "express"
import authRouter from "./auth.route"

export default function initRoute(app: Application) {
	app.use("/api/auth", authRouter)
}
