import { createRouter, serve } from "./mod.ts";
import * as mod from "https://deno.land/std@0.192.0/streams/mod.ts";

const router = createRouter()
  .get(/\//, (_) => "hello world")
  .post(/\//, async (req) => {
    if (req.body) {
      const decoder = new TextDecoder();
      const buf = await mod.readAll(
        mod.readerFromStreamReader(new ReadableStreamDefaultReader(req.body)),
      );
      return decoder.decode(buf);
    }
    return "{}";
  });

await serve(8000, router);
