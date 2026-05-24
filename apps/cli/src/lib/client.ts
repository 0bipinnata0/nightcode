import { hc } from "hono/client";
import type { AppType } from "@nightcode/server/app";

const baseUrl = process.env.SERVER_URL ?? "http://localhost:3000";

export const client = hc<AppType>(baseUrl);
