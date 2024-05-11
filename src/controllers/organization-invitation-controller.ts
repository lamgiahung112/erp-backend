import { OrganizationMemberInvitations } from "@prisma/client"
import { Autowired, Component } from "@src/decorators/di"
import OrganizationInvitationService from "@src/services/organization-invitation-service"

@Component()
class OrganizationInvitationController {
	@Autowired()
	private orgInvitationService!: OrganizationInvitationService

	async create(options: {
		orgId: string
		invitedUserId: string
		creatorId: string
	}): Promise<OrganizationMemberInvitations> {
		const [invitation, err] = await this.orgInvitationService.create(options)
		if (err) throw err
		return invitation!
	}
}

export default OrganizationInvitationController
