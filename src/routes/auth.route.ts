import { SignInHandler, SignUpHandler, VerifyHandler } from "@src/handlers/auth"
import { AuthenticationHandler } from "@src/middlewares"
import express from "express"
const authRouter = express.Router()

authRouter.post("/signup", SignUpHandler)
authRouter.post("/signin", SignInHandler)
authRouter.get("/verify", AuthenticationHandler, VerifyHandler)

export default authRouter
