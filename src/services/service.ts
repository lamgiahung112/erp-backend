import { Autowired } from "@src/decorators/di"
import DatabaseOperationResponseMapper from "@src/utils/db-operation-response-mapper"

abstract class Service {
	@Autowired()
	protected responseMapper!: DatabaseOperationResponseMapper
}

export default Service
