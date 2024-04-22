import addUserToOrganization from "./add-member"
import findMemberInOrganization from "./find-member"
import createInvitationToOrganization from "./create-invitation"
import createOrganization from "./create-organization"
import respondToInvitation from "./respond-to-invite"
import changeMemberRole from "./change-member-role"
import removeMemberFromOrganization from "./remove-member"
import getMemberList from "./get-member-list"

const organizationController = {
	create: createOrganization,
	addMember: addUserToOrganization,
	createInvitation: createInvitationToOrganization,
	findMember: findMemberInOrganization,
	respondToInvitation,
	changeMemberRole,
	removeMember: removeMemberFromOrganization,
	getMemberList,
} as const

export default organizationController
