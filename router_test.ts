import * as mod from "./router.ts"
import { assertEquals } from "https://deno.land/std@0.192.0/testing/asserts.ts";

Deno.test({
    name: "check that HttpVerbs work properly",
    fn() {
        const httpVerb = mod.HttpVerb.GET
        assertEquals(httpVerb, "GET", "check that HttpVerb.GET equals \"GET\"")
    }
})

Deno.test({
    name: "check that router RegExp works",
    fn() {
        const router = mod.createRouter()
          .get(/\//, _ => "hi")
        
        assertEquals(router.routes[0].path, /^\/\/?$/, "check that the RegExp generation works properly")
    }
})

Deno.test({
    name: "check that default HttpVerb is GET",
    fn() {
        const router = mod.createRouter()
          .addPath(/\//, _ => "hi")
        
        assertEquals(router.routes[0].method, mod.HttpVerb.GET, "check it's method is get")
    }
})

Deno.test({
    name: "check default not-found method",
    fn() {
        const router = mod.createRouter()

        assertEquals(router.notFound(new Request("test")), "not found")
    }
})