import { Component, Autowired } from "@src/decorators/di"
import AuthHandler from "@src/handlers/auth-handler"
import express from "express"
import AppRoute from "./app.route"

@Component()
class AuthRoute extends AppRoute {
	private authRouter = express.Router()

	@Autowired()
	private authHandler!: AuthHandler

	override init() {
		this.authRouter.post("/signup", this.authHandler.SignUp)
		this.authRouter.post("/signin", this.authHandler.SignIn)
		this.authRouter.get(
			"/verify",
			this.authHandler.VerifyUserToken,
			this.authHandler.MapUserDataFromAuthObject
		)
		return this.authRouter
	}
}

export default AuthRoute
