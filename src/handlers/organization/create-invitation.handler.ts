import { ApiRequest } from "@requests"
import organizationController from "@src/controllers/organization"
import userController from "@src/controllers/user"
import { AuthObject } from "@src/middlewares/authentication-handler"
import ApiError from "@src/utils/api-error"
import HttpCode from "@src/utils/http-code"
import { Handler } from "express"

const CreateInvitationHandler: Handler = async (req, res, next) => {
	try {
		const authObject = res.locals as AuthObject
		const { invitedUserEmail, organizationId } =
			req.body as ApiRequest.InviteToOrganization

		const invitedUser = await userController.findByEmail(invitedUserEmail)
		const isUserAlreadyInOrg =
			invitedUser != null &&
			(await organizationController.findMember({
				orgId: organizationId,
				userId: invitedUser.id,
			}))
		if (isUserAlreadyInOrg) {
			throw new Error("User is already in this organization!")
		}

		const invitationCreator = await organizationController.findMember({
			orgId: organizationId,
			userId: authObject.authenticatedUser.id,
		})
		const isInvitationCreatorNotInOrg = !invitationCreator
		const isCreatorNotAdminOrOwner = invitationCreator?.role === "Member"
		if (isInvitationCreatorNotInOrg || isCreatorNotAdminOrOwner) {
			throw new Error("You are not allowed to add members to this organization!")
		}

		const invitation = await organizationController.createInvitation({
			orgId: organizationId,
			creatorId: authObject.authenticatedUser.id,
			invitedUserId: invitedUser!.id,
		})

		res.locals = {
			payload: invitation,
		}
		next()
	} catch (error) {
		next(new ApiError((error as Error).message, HttpCode.BAD_REQUEST))
	}
}

export default CreateInvitationHandler
