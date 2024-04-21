import db from "@src/db"

export default async function respondToInvitation(options: {
	orgId: string
	invitedUserId: string
	accepted: boolean
}) {
	await db.organizationMemberInvitations.delete({
		where: {
			orgId_invitedUserId: {
				orgId: options.orgId,
				invitedUserId: options.invitedUserId,
			},
		},
	})

	if (options.accepted) {
		await db.organizationMembers.create({
			data: {
				orgId: options.orgId,
				userId: options.invitedUserId,
				role: "Member",
			},
		})
	}
}
