import db from "@src/db"
import { Component } from "@src/decorators/di"
import Service from "./service"

@Component()
class OrganizationMemberService extends Service {
	findMemberInOrganization(options: { orgId: string; userId: string }) {
		return db.organizationMembers
			.findUnique({
				where: {
					orgId_userId: options,
				},
			})
			.then(
				this.responseMapper.handle({
					messageOnFail: "User is not in this organization!",
				})
			)
	}
}

export default OrganizationMemberService
