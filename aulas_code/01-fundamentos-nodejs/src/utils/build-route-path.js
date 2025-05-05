// /users/:id
export function buildingRoutePath(path) {
    const routeParametersRegex = /:([a-zA-Z]+)/g

    console.log(Array.from(path.matchAll(routeParametersRegex)))
}