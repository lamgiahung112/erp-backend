import db from "@src/db"
import { Component } from "@src/decorators/di"
import Service from "./service"

@Component()
class OrganizationInvitationService extends Service {
	create(options: { orgId: string; invitedUserId: string; creatorId: string }) {
		return db.organizationMemberInvitations
			.create({
				data: options,
			})
			.then(
				this.responseMapper.handle({
					messageOnFail: "Failed to send invitation!",
				})
			)
	}
}

export default OrganizationInvitationService
