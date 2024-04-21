import db from "@src/db"

export default async function createInvitationToOrganization(options: {
	orgId: string
	invitedUserId: string
	creatorId: string
}) {
	return db.organizationMemberInvitations.create({
		data: options,
	})
}
