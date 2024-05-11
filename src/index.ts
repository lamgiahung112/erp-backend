import express from "express"
import { ResponseHandler, ErrorHandler } from "./middlewares"
import dotenv from "dotenv"
import cors from "cors"
import { Autowired } from "./decorators/di"
import RouteInitializer from "./routes/route-initializer"

class App {
	private app = express()
	private port = 3001

	@Autowired()
	private routeInitializer!: RouteInitializer

	init() {
		this.configEnvironment()
		this.configCors()
		this.configEncoding()
		this.configRoutes()
		this.configResponseAndErrorHandler()
		this.startServer()
	}

	private configEnvironment() {
		dotenv.config()
	}

	private configCors() {
		this.app.use(cors())
	}

	private configEncoding() {
		this.app.use(express.json())
		this.app.use(express.urlencoded({ extended: true }))
	}

	private configRoutes() {
		this.routeInitializer.initRoute(this.app)
	}

	private configResponseAndErrorHandler() {
		this.app.use(ResponseHandler)
		this.app.use(ErrorHandler)
	}

	private startServer() {
		this.app.listen(this.port, () => {
			console.log("LISTENING ON PORT 3001")
		})
	}
}

const app = new App()
app.init()
