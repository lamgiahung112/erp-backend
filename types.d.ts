import ApiError from "@src/utils/api-error"

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

declare type ErrorProneOperationResponse<T> = [T | null, ApiError | null]
