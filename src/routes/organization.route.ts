import {
	ChangeMemberRoleHandler,
	CreateInvitationHandler,
	CreateOrganizationHandler,
	RespondToInvitationHandler,
} from "@src/handlers/organization"
import { AuthenticationHandler } from "@src/middlewares"
import express from "express"
const organizationRouter = express.Router()

organizationRouter.use(AuthenticationHandler)

organizationRouter.post("/", CreateOrganizationHandler)
organizationRouter.post("/invite", CreateInvitationHandler)
organizationRouter.post("/invite/respond", RespondToInvitationHandler)
organizationRouter.post("/members/role", ChangeMemberRoleHandler)

export default organizationRouter
