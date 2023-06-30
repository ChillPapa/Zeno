export type Handler = (req: Request, pathParams: { [key: string]: string } | undefined) => string

export class Router {
    routes: { path: RegExp, handler: Handler }[];
    constructor(...routes: { path: RegExp, handler: Handler}[]) {
        this.routes = routes
    }

    addPath(path: RegExp, handler: Handler): Router {
        console.log(path)
        console.log(new RegExp(`^${path.toString().substring(1, -1)}/?$`))
        this.routes.push({path: new RegExp(`^${path}/?$`), handler})
        return this
    }
}

export function createRouter(): Router {
    return new Router()
}