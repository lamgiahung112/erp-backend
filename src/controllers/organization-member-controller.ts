import { Autowired, Component } from "@src/decorators/di"
import OrganizationMemberService from "@src/services/organization-member-service"

@Component()
class OrganizationMemberController {
	@Autowired()
	private orgMemberService!: OrganizationMemberService

	async checkMemberExists(options: { orgId: string; userId: string }) {
		const [_, err] = await this.orgMemberService.findMemberInOrganization(options)
		if (err) return false
		return true
	}
}

export default OrganizationMemberController
