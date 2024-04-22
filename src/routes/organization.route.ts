import {
	ChangeMemberRoleHandler,
	CreateInvitationHandler,
	CreateOrganizationHandler,
	GetMemberListHandler,
	RemoveMemberHandler,
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
organizationRouter.delete("/members", RemoveMemberHandler)
organizationRouter.get("/members", GetMemberListHandler)

export default organizationRouter
