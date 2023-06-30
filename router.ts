export type Handler = (req: Request, pathParams: { [key: string]: string } | undefined) => string

export class Router {
    routes: { path: RegExp, handler: Handler }[];
    notFound: (req: Request) => string
    constructor(...routes: { path: RegExp, handler: Handler}[]) {
        this.routes = routes
        this.notFound = _ => "not found"
    }

    addPath(path: RegExp, handler: Handler): Router {
        this.routes.push({path: new RegExp(`^${path.toString().substring(1, -1)}/?$`), handler})
        return this
    }

    addNotFound(notFound: (req: Request) => string) {
        this.notFound = notFound
    }
}

export function createRouter(): Router {
    return new Router()
}