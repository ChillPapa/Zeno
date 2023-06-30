import { type Router } from "./router.ts";

export async function serve(port: number, router: Router) {
    const server = Deno.listen({ port })

    for await (const conn of server) {
        serveHttp(conn, router)
    }
}

async function serveHttp(conn: Deno.Conn, router: Router) {
    const httpConn = Deno.serveHttp(conn)

    for await (const reqEvent of httpConn) {
        for (const route of router.routes) {
            if (route.path.test(new URL(reqEvent.request.url).pathname)) {
                reqEvent.respondWith(
                    new Response(
                        route.handler(reqEvent.request, (route.path.exec(new URL(reqEvent.request.url).pathname) || { groups: {} }).groups),
                        { status: 200 }
                    )
                )
            }
        }
    }
}