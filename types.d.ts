declare type AuthenticatedUserData = {
	id: string
	fullName: string
	isActive: boolean
	username: string
	iat: number
	exp: number
}

declare type AuthObject = {
	authenticatedUser: AuthenticatedUserData
	authToken: string
}
