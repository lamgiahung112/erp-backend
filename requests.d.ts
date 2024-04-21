import type { OrganizationMemberRole, Users } from "@prisma/client"

declare namespace ApiRequest {
	declare type SignUp = Omit<Users, "id" | "isActive"> & {
		isActive: true
	}

	declare type SignIn = {
		username: string
		password: string
	}

	declare type CreateOrganization = {
		name: string
	}

	declare type InviteToOrganization = {
		invitedUserEmail: string
		organizationId: string
	}

	declare type ChangeMemberRole = {
		organizationId: string
		memberEmail: string
		role: OrganizationMemberRole
	}

	declare type AddMemberToOrganization = {
		organizationId: string
		userId: string
		role: OrganizationMemberRole
	}

	declare type RespondToInvitation = {
		organizationId: string
		accepted: boolean
	}
}
