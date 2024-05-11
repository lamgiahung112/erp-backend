import { Users } from "@prisma/client"
import { Component, Autowired } from "@src/decorators/di"
import JwtService from "@src/services/jwt-service"

@Component()
class JwtController {
	@Autowired()
	private jwtService!: JwtService

	generateTokenForUser(data: Users) {
		return this.jwtService.generate(data)
	}

	verifyToken(token: string) {
		return this.jwtService.verify(token)
	}
}

export default JwtController
