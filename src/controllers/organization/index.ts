import addUserToOrganization from "./add-member"
import findMemberInOrganization from "./find-member"
import createInvitationToOrganization from "./create-invitation"
import createOrganization from "./create-organization"
import respondToInvitation from "./respond-to-invite"
import changeMemberRole from "./change-member-role"

const organizationController = {
	create: createOrganization,
	addMember: addUserToOrganization,
	createInvitation: createInvitationToOrganization,
	findMember: findMemberInOrganization,
	respondToInvitation,
	changeMemberRole,
} as const

export default organizationController
