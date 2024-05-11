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
		const [createdUser, err] = await this.userService.createUser(request)

		if (err) throw err
		return createdUser
	}

	async findUserAndCheckPassword(request: ApiRequest.SignIn): Promise<Users> {
		const [user, err] = await this.userService.findByUsername(request.username)

		if (err) throw err

		if (user && bcrypt.compareSync(request.password, user.password)) {
			return user
		}

		throw new ApiError("Wrong username or password", HttpCode.BAD_REQUEST)
	}
}

export default AuthController
