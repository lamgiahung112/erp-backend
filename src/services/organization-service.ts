import { Organizations } from "@prisma/client"
import db from "@src/db"
import { Component } from "@src/decorators/di"
import { AuthenticatedUserData, ErrorProneOperationResponse } from "@types"
import Service from "./service"

@Component()
class OrganizationService extends Service {
	async create(orgName: string, creator: AuthenticatedUserData) {
		return db.organizations
			.create({
				data: {
					name: orgName,
					creatorId: creator.id,
				},
			})
			.then(
				this.responseMapper.handle({
					messageOnFail: "Failed to create organization!",
				})
			)
	}
}

export default OrganizationService
