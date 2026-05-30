import { Hono } from "hono";
import { createWelcomeMessage, projectDescription, projectName } from "@nightcode/shared";
import { createAnthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

let baseURL = process.env.ANTHROPIC_BASE_URL || "https://api.anthropic.com/v1";
if (baseURL && !baseURL.endsWith("/v1") && !baseURL.endsWith("/v1/")) {
  baseURL = baseURL.replace(/\/$/, "") + "/v1/";
}

const anthropicProvider = createAnthropic({
  baseURL,
  apiKey: process.env.ANTHROPIC_API_KEY,
});

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
  })
  .get("/llmTest", async (context) => {
    const prompt = context.req.query("prompt") || "Hello, write a 1-sentence welcome greeting.";
    try {
      const result = streamText({
        model: anthropicProvider("claude-sonnet-4-6"),
        prompt,
      });
      return result.toTextStreamResponse();
    } catch (error: any) {
      console.error("AI Error:", error);
      return context.json(
        {
          success: false as const,
          error: error.message || String(error),
          tip: "Please make sure ANTHROPIC_API_KEY is set in your environment variables.",
        },
        500
      );
    }
  })
  .post(
    "/llmTest",
    zValidator(
      "json",
      z.object({
        prompt: z.string().optional(),
      })
    ),
    async (context) => {
      try {
        const { prompt = "Hello, write a 1-sentence welcome greeting." } = context.req.valid("json");
        const result = streamText({
          model: anthropicProvider("claude-sonnet-4-6"),
          prompt,
        });
        return result.toTextStreamResponse();
      } catch (error: any) {
        console.error("AI Error:", error);
        return context.json(
          {
            success: false as const,
            error: error.message || String(error),
            tip: "Please make sure ANTHROPIC_API_KEY is set in your environment variables.",
          },
          500
        );
      }
    }
  );

export type AppType = typeof app;

