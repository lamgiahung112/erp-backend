import { Component, Autowired } from "@src/decorators/di"
import { ApiRequest } from "@requests"
import UserService from "@src/services/user-service"
import bcrypt from "bcrypt"
import ApiError from "@src/utils/api-error"
import HttpCode from "@src/utils/http-code"
import { Users } from "@prisma/client"

@Component()
class AuthController {
	@Autowired()
	private userService!: UserService

	async createUser(request: ApiRequest.SignUp) {
		return this.userService.createUser(request)
	}

	async findUserAndCheckPassword(
		request: ApiRequest.SignIn
	): Promise<[Users | null, ApiError | null]> {
		return this.userService.findByUsername(request.username).then((user) => {
			if (user && bcrypt.compareSync(request.password, user.password)) {
				return [user, null] as const
			}
			return [
				null,
				new ApiError("Wrong username or password!", HttpCode.BAD_REQUEST),
			]
		})
	}
}

export default AuthController
