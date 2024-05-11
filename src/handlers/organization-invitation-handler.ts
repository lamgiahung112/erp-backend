import { ApiRequest } from "@requests"
import OrganizationController from "@src/controllers/organization-controller"
import OrganizationInvitationController from "@src/controllers/organization-invitation-controller"
import OrganizationMemberController from "@src/controllers/organization-member-controller"
import { Autowired, Component } from "@src/decorators/di"
import { AuthObject } from "@types"
import { Handler } from "express"

@Component()
class OrganizationInvitationHandler {
	@Autowired()
	private orgController!: OrganizationController

	@Autowired()
	private orgInvitationController!: OrganizationInvitationController

	@Autowired()
	private orgMemberController!: OrganizationMemberController

	CreateInvitation: Handler = async (req, res, next) => {
		try {
			// const memberExists = await this.orgMemberController.checkMemberExists()
		} catch (error) {
			next(error)
		}
	}
}

export default OrganizationInvitationHandler
