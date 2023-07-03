import { type Router } from "./router.ts";

export async function serve(port: number, router: Router) {
  const server = Deno.listen({ port });

  for await (const conn of server) {
    serveHttp(conn, router);
  }
}

async function serveHttp(conn: Deno.Conn, router: Router) {
  const httpConn = Deno.serveHttp(conn);

  for await (const reqEvent of httpConn) {
    for (const [idx, route] of router.routes.entries()) {
      console.log(route)
      if (idx == router.routes.length - 1) {
        if (
          route.path.test(new URL(reqEvent.request.url).pathname) &&
          reqEvent.request.method == route.method
        ) {
          reqEvent.respondWith(
            new Response(
              await route.handler(
                reqEvent.request,
                route.path.exec(new URL(reqEvent.request.url).pathname)?.groups || {},
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
              route.path.exec(new URL(reqEvent.request.url).pathname)?.groups || {},
            ) + "\n",
            { status: 200 },
          ),
        );
        break;
      }
    }
  }
}
