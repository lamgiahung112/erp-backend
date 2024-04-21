import db from "@src/db"
import type { OrganizationMemberRole } from "@prisma/client"

export default async function addUserToOrganization(options: {
	orgId: string
	userId: string
	role: OrganizationMemberRole
}) {
	return db.organizationMembers.create({
		data: options,
	})
}
