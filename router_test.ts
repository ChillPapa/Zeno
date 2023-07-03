import { HttpVerb } from "./router.ts";
import router from "./example/app.ts";
import { assertEquals } from "https://deno.land/std@0.192.0/testing/asserts.ts";
import {
  describe,
  it,
} from "https://deno.land/std@0.192.0/testing/bdd.ts";

describe("HttpVerb", () => {
  it("should be comparable to a string", () => {
    const httpVerb = HttpVerb.GET;
    assertEquals(httpVerb, "GET", 'check that HttpVerb.GET equals "GET"');
    const httpVerb2 = HttpVerb.POST;
    assertEquals(httpVerb2, "POST", 'check that HttpVerb.POST equals "POST"');
  })
})

describe("Router", () => {
  it("should generate RegExp correctly", () => {
    assertEquals(
      router.routes[0].path,
      /^\/\/?$/,
      "check that the RegExp generation works properly",
    );
  })
  describe("notFound", () => {
    it("should default to () => \"not found\"", () => {
      assertEquals(
        router.notFound(new Request("http://test.com/")),
        "not found",
        "check if it returns \"not found\""
      );
    })
  })
  describe("addPath", () => {
    describe("method", () => {
      it("should default to HttpVerb.GET", () => {
        assertEquals(
          router.routes[2].method,
          HttpVerb.GET,
          "check its method is get",
        );
      })
    })
  })
})
