export type Handler = (
  req: Request,
  pathParams: { [key: string]: string } | undefined,
) => string | Promise<string>;

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

export class Router {
  routes: { path: RegExp; handler: Handler; method: HttpVerb }[];
  notFound: (req: Request) => string | Promise<string>;

  constructor(
    ...routes: { path: RegExp; handler: Handler; method: HttpVerb }[]
  ) {
    this.routes = routes;
    this.notFound = (_) => "not found";
  }

  addPath(
    path: RegExp,
    handler: Handler,
    method: HttpVerb = HttpVerb.GET,
  ): Router {
    this.routes.push({
      path: new RegExp(`^${path.toString().substring(1, -1)}/?$`),
      handler,
      method,
    });
    return this;
  }

  get(path: RegExp, handler: Handler): Router {
    this.routes.push({
      path: new RegExp(`^${path.toString().substring(1, -1)}/?$`),
      handler,
      method: HttpVerb.GET,
    });
    return this;
  }

  post(path: RegExp, handler: Handler): Router {
    this.routes.push({
      path: new RegExp(`^${path.toString().substring(1, -1)}/?$`),
      handler,
      method: HttpVerb.POST,
    });
    return this;
  }

  put(path: RegExp, handler: Handler): Router {
    this.routes.push({
      path: new RegExp(`^${path.toString().substring(1, -1)}/?$`),
      handler,
      method: HttpVerb.PUT,
    });
    return this;
  }

  delete(path: RegExp, handler: Handler): Router {
    this.routes.push({
      path: new RegExp(`^${path.toString().substring(1, -1)}/?$`),
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
