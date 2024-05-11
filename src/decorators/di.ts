import "reflect-metadata"

const instances = new Map<string, any>()

function Component() {
	return (constructor: any) => {
		instances.set(constructor.name, new constructor())
		Object.seal(constructor)
		Object.seal(constructor.prototype)
	}
}

function Autowired() {
	return function (target: any, propertyKey: string) {
		const t = Reflect.getMetadata("design:type", target, propertyKey)

		if (!instances.has(t.name)) {
			throw new Error("Autowired a non-Component dependency!")
		}

		Object.defineProperty(target, propertyKey, {
			configurable: false,
			enumerable: false,
			value: instances.get(t.name),
		})
	}
}

export { Component, Autowired }
