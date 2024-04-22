import db from "@src/db"

export default async function removeMemberFromOrganization(options: {
	orgId: string
	userId: string
}) {
	return db.organizationMembers.delete({
		where: {
			orgId_userId: options,
		},
	})
}
