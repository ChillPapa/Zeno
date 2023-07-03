/**
 * Handler
 * 
 * this is the type of a handler
 * 
 * example:
 * 
 * ```ts
 * const handler = (req: Request) => req.method
 * ```
 * 
 * is a `Handler` and so is that async version of that
 * 
 * @param { Request } req - this is the request object
 * @param { [key: string]: string } - these are path params
 */
export type Handler = (
  req: Request,
  pathParams: PathParams,
) => string | Promise<string>;

/**
 * PathParams
 * 
 * the type of path params
 */
export type PathParams = { [key: string]: string }

/**
 * HttpVerb
 * 
 * this is an enum of http verbs
 */
export const enum HttpVerb {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  PUT = "PUT",
  DELETE = "DELETE",
  HEAD = "HEAD",
  CONNECT = "CONNECT",
  OPTION = "OPTION",
  TRACE = "TRACE",
}

/**
 * Router
 * 
 * this is the router class
 * 
 * it allows you to add routes
 */
export class Router {
  routes: { path: RegExp; handler: Handler; method: HttpVerb }[];
  notFound: (req: Request) => string | Promise<string>;

  constructor(
    ...routes: { path: RegExp; handler: Handler; method: HttpVerb }[]
  ) {
    this.routes = routes;
    this.notFound = () => "not found";
  }

  addPath(
    path: RegExp,
    handler: Handler,
    method: HttpVerb = HttpVerb.GET,
  ): Router {
    this.routes.push({
      path: new RegExp(`^${path.toString().substring(1, path.toString().length - 1)}/?$`),
      handler,
      method,
    });
    return this;
  }

  get(path: RegExp, handler: Handler): Router {
    this.routes.push({
      path: new RegExp(`^${path.toString().substring(1, path.toString().length - 1)}/?$`),
      handler,
      method: HttpVerb.GET,
    });
    return this;
  }

  post(path: RegExp, handler: Handler): Router {
    this.routes.push({
      path: new RegExp(`^${path.toString().substring(1, path.toString().length - 1)}/?$`),
      handler,
      method: HttpVerb.POST,
    });
    return this;
  }

  put(path: RegExp, handler: Handler): Router {
    this.routes.push({
      path: new RegExp(`^${path.toString().substring(1, path.toString().length - 1)}/?$`),
      handler,
      method: HttpVerb.PUT,
    });
    return this;
  }

  delete(path: RegExp, handler: Handler): Router {
    this.routes.push({
      path: new RegExp(`^${path.toString().substring(1, path.toString().length - 1)}/?$`),
      handler,
      method: HttpVerb.DELETE,
    });
    return this;
  }

  addNotFound(notFound: (req: Request) => string): Router {
    this.notFound = notFound;
    return this;
  }
}

export function createRouter(): Router {
  return new Router();
}
