import type { Employees } from "@prisma/client"

declare namespace Request {
	declare type SignUp = Omit<Employees, "id" | "isActive"> & {
		isActive: true
	}

	declare type SignIn = {
		username: string
		password: string
	}
}
