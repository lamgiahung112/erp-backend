import { ApiRequest } from "@requests"
import organizationController from "@src/controllers/organization"
import { AuthObject } from "@src/middlewares/authentication-handler"
import ApiError from "@src/utils/api-error"
import HttpCode from "@src/utils/http-code"
import { Handler } from "express"

const RemoveMemberHandler: Handler = async (req, res, next) => {
	try {
		const authObject = res.locals as AuthObject
		const { memberUserId, organizationId } = req.body as ApiRequest.RemoveOrgMember

		const memberToBeDeleted = await organizationController.findMember({
			orgId: organizationId,
			userId: memberUserId,
		})
		if (!memberToBeDeleted) {
			throw new Error("This user is not a member of this organization")
		}

		const memberMakingDeleteRequest = await organizationController.findMember({
			orgId: organizationId,
			userId: authObject.authenticatedUser.id,
		})
		if (memberMakingDeleteRequest === null) {
			throw new Error("You are not a member of this organization!")
		}

		const isMemberMakingRequestNotARegularMember =
			memberMakingDeleteRequest.role !== "Member"
		const isNotAdminRemovingOwner =
			memberMakingDeleteRequest.role !== "Admin" &&
			memberToBeDeleted.role !== "Owner"
		const isAbleToDelete =
			isMemberMakingRequestNotARegularMember && isNotAdminRemovingOwner

		if (!isAbleToDelete) {
			throw new Error("Not allowed!")
		}
		await organizationController.removeMember({
			orgId: organizationId,
			userId: memberToBeDeleted.userId,
		})
		next()
	} catch (error) {
		next(new ApiError((error as Error).message, HttpCode.BAD_REQUEST))
	}
}

export default RemoveMemberHandler
