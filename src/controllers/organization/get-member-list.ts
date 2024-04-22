import { ApiRequest } from "@requests"
import db from "@src/db"

export default async function getMemberList(
	options: { orgId: string } & ApiRequest.Pagination
) {
	return db.organizationMembers
		.findMany({
			include: {
				member: true,
			},
			take: options.pageSize,
			skip: (options.page - 1) * options.pageSize,
			where: {
				orgId: options.orgId,
			},
		})
		.then((list) =>
			list.map((item) => {
				return {
					id: item.member.id,
					email: item.member.email,
					fullName: item.member.fullName,
					role: item.role,
				}
			})
		)
}
