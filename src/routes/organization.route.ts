import { CreateOrganizationHandler } from "@src/handlers/organization"
import { AuthenticationHandler } from "@src/middlewares"
import express from "express"
const organizationRouter = express.Router()

organizationRouter.use(AuthenticationHandler)

organizationRouter.post("/", CreateOrganizationHandler)

export default organizationRouter
