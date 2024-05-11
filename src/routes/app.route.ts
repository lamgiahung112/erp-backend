import { Router } from "express"

abstract class AppRoute {
	abstract init(): Router
}

export default AppRoute
