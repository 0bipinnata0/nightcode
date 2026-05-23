import { Hono } from "hono";
import { createWelcomeMessage, projectDescription, projectName } from "@nightcode/shared";

export const app = new Hono();

app.get("/", (context) => {
  return context.json({
    message: createWelcomeMessage("server"),
    name: projectName,
    description: projectDescription,
    service: "@nightcode/server",
  });
});

app.get("/health", (context) => {
  return context.json({
    ok: true,
    runtime: "bun",
  });
});

const port = Number(process.env.PORT ?? 3000);

const server = Bun.serve({
  port,
  fetch: app.fetch,
});

console.log(`@nightcode/server listening on ${server.url}`);
