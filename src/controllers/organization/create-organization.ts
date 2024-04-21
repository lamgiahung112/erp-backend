import db from "@src/db"
import { AuthenticatedUserData } from "../jwt"

export default async function createOrganization(
	orgName: string,
	creator: AuthenticatedUserData
) {
	return db.organization.create({
		data: {
			name: orgName,
			creatorId: creator.id,
		},
	})
}
