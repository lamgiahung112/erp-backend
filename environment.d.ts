declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DB_URL: string
			JWT_SECRET: string
			JWT_EXPIRES: string
		}
	}
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
