import addUserToOrganization from "./add-member"
import createOrganization from "./create-organization"

const organizationController = {
	create: createOrganization,
	addMember: addUserToOrganization,
} as const

export default organizationController
