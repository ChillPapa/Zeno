/**
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
 * @param { { [key: string]: string } } - these are path params
 * @public
 */
export type Handler = (
  req: Request,
  pathParams: PathParams,
) => string | Promise<string>;

/**
 * the type of path params
 * @public
 */
export type PathParams = { [key: string]: string };

/**
 * this is an enum of http verbs
 * @public
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
 * this is the router class
 *
 * it allows you to add routes
 * @class
 * @public
 * @constructor
 */
export class Router {
  /**
   * routes are defined here
   * @type { { path: RegExp(); handler: Handler; method: HttpVerb }[] }
   * @public
   */
  routes: { path: RegExp; handler: Handler; method: HttpVerb }[];

  /**
   * this is what gets displayed when there is a 404
   *
   * @type { (req: Request) => string | Promise<string> }
   * @default () => "not found"
   * @public
   */
  notFound: (req: Request) => string | Promise<string>;

  /**
   * Constructs routes
   * @param { { path: RegExp; handler: Handler; method: HttpVerb }[] } routes - the routes to be initialized with
   * @public
   */
  constructor(
    ...routes: { path: RegExp; handler: Handler; method: HttpVerb }[]
  ) {
    this.routes = routes;
    this.notFound = () => "not found";
  }

  /**
   * adds a path
   * @param { RegExp } path - the route's path
   * @param { Handler } handler - the route's handler
   * @param { HttpVerb } [method=HttpVerb.GET] - the http method
   * @returns { Router } - returns itself so you can chain methods
   * @public
   */
  addPath(
    path: RegExp,
    handler: Handler,
    method: HttpVerb = HttpVerb.GET,
  ): Router {
    this.routes.push({
      path: new RegExp(
        `^${path.toString().substring(1, path.toString().length - 1)}/?$`,
      ),
      handler,
      method,
    });
    return this;
  }

  /**
   * adds a path with the get method
   * @param { RegExp } path - the route's path
   * @param { Handler } handler - the route's handler
   * @returns { Router } - returns itself so you can chain methods
   * @public
   */
  get(path: RegExp, handler: Handler): Router {
    this.routes.push({
      path: new RegExp(
        `^${path.toString().substring(1, path.toString().length - 1)}/?$`,
      ),
      handler,
      method: HttpVerb.GET,
    });
    return this;
  }

  /**
   * adds a path with the post method
   * @param { RegExp } path - the route's path
   * @param { Handler } handler - the route's handler
   * @returns { Router } - returns itself so you can chain methods
   * @public
   */
  post(path: RegExp, handler: Handler): Router {
    this.routes.push({
      path: new RegExp(
        `^${path.toString().substring(1, path.toString().length - 1)}/?$`,
      ),
      handler,
      method: HttpVerb.POST,
    });
    return this;
  }

  /**
   * adds a path with the put method
   * @param { RegExp } path - the route's path
   * @param { Handler } handler - the route's handler
   * @returns { Router } - returns itself so you can chain methods
   * @public
   */
  put(path: RegExp, handler: Handler): Router {
    this.routes.push({
      path: new RegExp(
        `^${path.toString().substring(1, path.toString().length - 1)}/?$`,
      ),
      handler,
      method: HttpVerb.PUT,
    });
    return this;
  }

  /**
   * adds a path with the delete method
   * @param { RegExp } path - the route's path
   * @param { Handler } handler - the route's handler
   * @returns { Router } - returns itself so you can chain methods
   * @public
   */
  delete(path: RegExp, handler: Handler): Router {
    this.routes.push({
      path: new RegExp(
        `^${path.toString().substring(1, path.toString().length - 1)}/?$`,
      ),
      handler,
      method: HttpVerb.DELETE,
    });
    return this;
  }

  /**
   * add a 404 handler
   * @param notFound - the handler
   * @returns { Router } - returns itself so you can chain methods
   * @public
   */
  addNotFound(notFound: (req: Request) => string): Router {
    this.notFound = notFound;
    return this;
  }
}

/**
 * creates router
 * @returns { Router } - returns an empty router
 * @public
 */
export function createRouter(): Router {
  return new Router();
}
