import db from "@src/db"
import type { OrganizationMemberRole } from "@prisma/client"

export default async function changeMemberRole(options: {
	orgId: string
	userId: string
	role: OrganizationMemberRole
}) {
	return db.organizationMembers.update({
		data: {
			role: options.role,
		},
		where: {
			orgId_userId: {
				orgId: options.orgId,
				userId: options.userId,
			},
		},
	})
}
