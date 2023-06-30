import { serve, createRouter } from "./mod.ts"

const router = createRouter()
  .addPath(/\//, _ => "hello world")

await serve(8000, router)
