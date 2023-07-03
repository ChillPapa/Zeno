import { type Router } from "./router.ts";

/**
 * serves the program
 * @param { number } [port=8000] - the port that the server should be on
 * @param { Router } router - the router
 * @public
 */
export async function serve(router: Router, port = 8000) {
  const server = Deno.listen({ port });

  for await (const conn of server) {
    serveHttp(conn, router);
  }
}

/**
 * serves the http
 * @param { Deno.Conn } conn - the connection
 * @param { Router } router - the router
 * @private
 */
async function serveHttp(conn: Deno.Conn, router: Router) {
  const httpConn = Deno.serveHttp(conn);

  for await (const reqEvent of httpConn) {
    for (const [idx, route] of router.routes.entries()) {
      if (idx == router.routes.length - 1) {
        if (
          route.path.test(new URL(reqEvent.request.url).pathname) &&
          reqEvent.request.method == route.method
        ) {
          reqEvent.respondWith(
            new Response(
              await route.handler(
                reqEvent.request,
                route.path.exec(new URL(reqEvent.request.url).pathname)
                  ?.groups || {},
              ) + "\n",
              { status: 200 },
            ),
          );
          break;
        } else {
          reqEvent.respondWith(
            new Response(
              await router.notFound(reqEvent.request) + "\n",
              { status: 404 },
            ),
          );
        }
      }

      if (
        route.path.test(new URL(reqEvent.request.url).pathname) &&
        reqEvent.request.method == route.method.toString()
      ) {
        reqEvent.respondWith(
          new Response(
            await route.handler(
              reqEvent.request,
              route.path.exec(new URL(reqEvent.request.url).pathname)?.groups ||
                {},
            ) + "\n",
            { status: 200 },
          ),
        );
        break;
      }
    }
  }
}
