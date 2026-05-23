import { Hono } from "hono";

export const app = new Hono();

app.get("/", (context) => {
  return context.json({
    message: "Welcome to Nightcode server",
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
