import { Hono } from "hono";
import { createWelcomeMessage, projectDescription, projectName } from "@nightcode/shared";

export const app = new Hono()
  .get("/", (context) => {
    return context.json({
      message: createWelcomeMessage("server"),
      name: projectName,
      description: projectDescription,
      service: "@nightcode/server",
    });
  })
  .get("/health", (context) => {
    return context.json({
      status: "healthy",
      runtime: "bun",
    });
  });

export type AppType = typeof app;
