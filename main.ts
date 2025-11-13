#!/usr/bin/env deno run -A
import "$std/dotenv/load.ts";
import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";

await start(manifest);
