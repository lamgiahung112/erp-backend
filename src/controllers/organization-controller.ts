import { Organizations } from "@prisma/client"
import { ApiRequest } from "@requests"
import { Autowired, Component } from "@src/decorators/di"
import OrganizationService from "@src/services/organization-service"
import ApiError from "@src/utils/api-error"
import { AuthenticatedUserData, ErrorProneOperationResponse } from "@types"

@Component()
class OrganizationController {
	@Autowired()
	private orgService!: OrganizationService

	async create(
		orgName: string,
		creator: AuthenticatedUserData
	): Promise<Organizations> {
		try {
			const [createdOrg, err] = await this.orgService.create(orgName, creator)

			if (err) {
				throw err
			}

			return createdOrg!
		} catch (error) {
			throw error
		}
	}
}

export default OrganizationController
