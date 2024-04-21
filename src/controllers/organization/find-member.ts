import db from "@src/db"

export default async function findMemberInOrganization(options: {
	orgId: string
	userId: string
}) {
	return db.organizationMembers.findUnique({
		where: {
			orgId_userId: options,
		},
	})
}
