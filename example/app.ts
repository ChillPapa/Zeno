import { createRouter, serve } from "../mod.ts";
import {
  readAll,
  readerFromStreamReader,
} from "https://deno.land/std@0.192.0/streams/mod.ts";

const echo = async (req: Request): Promise<string> => {
  if (req.body) {
    const decoder = new TextDecoder();
    const buf = await readAll(
      readerFromStreamReader(new ReadableStreamDefaultReader(req.body)),
    );
    if (decoder.decode(buf)) {
      return decoder.decode();
    }
    return "body is empty";
  }
  return "no body provided";
};

const router = createRouter()
  .get(/\//, () => "hello world")
  .post(/\//, echo);

export const app = async () => await serve(8000, router);

if (import.meta.main) {
  app();
}
