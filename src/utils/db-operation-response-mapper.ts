import { Component } from "@src/decorators/di"
import ApiError from "./api-error"
import HttpCode from "./http-code"
import { ErrorProneOperationResponse } from "@types"

@Component()
class DatabaseOperationResponseMapper {
	handle<T>(param: { messageOnFail: string }) {
		return (data: T | null): ErrorProneOperationResponse<T> =>
			[
				data,
				data !== null
					? null
					: new ApiError(param.messageOnFail, HttpCode.BAD_REQUEST),
			] as const
	}
}

export default DatabaseOperationResponseMapper
