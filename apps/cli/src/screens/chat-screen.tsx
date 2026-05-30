import { useLocation } from "react-router";
import { TextAttributes } from "@opentui/core";
import { useEffect, useRef } from "react";
import { useCompletion } from "@ai-sdk/react";
import { client } from "../lib/client";
import { z } from "zod";

const chatStateSchema = z.object({
  text: z.string().optional(),
});

export function ChatScreen() {
  const location = useLocation();
  const parsed = chatStateSchema.safeParse(location.state);
  const prompt = parsed.success && parsed.data.text ? parsed.data.text : "";

  const { complete, completion, isLoading, error } = useCompletion({
    api: client.llmTest.$url().toString(),
    streamProtocol: "text",
  });

  const calledRef = useRef(false);

  useEffect(() => {
    if (prompt && !calledRef.current) {
      calledRef.current = true;
      complete(prompt);
    }
  }, [prompt, complete]);

  return (
    <box flexDirection="column" flexGrow={1}>
      <box flexDirection="row" justifyContent="space-between" marginBottom={1}>
        <text fg="cyan" attributes={TextAttributes.BOLD}>
          Chat Streaming
        </text>
        <text fg="red" attributes={TextAttributes.DIM}>
          [q] Quit
        </text>
      </box>

      {/* Display Prompt */}
      {prompt ? (
        <box flexDirection="column" marginBottom={1}>
          <text fg="yellow" attributes={TextAttributes.BOLD}>
            Prompt:
          </text>
          <text fg="white" marginLeft={2}>
            {prompt}
          </text>
        </box>
      ) : null}

      {/* Output Display Box */}
      <scrollbox
        flexDirection="column"
        flexGrow={1}
        borderStyle="single"
        padding={1}
        marginBottom={1}
      >
        {!isLoading && !completion && !error && (
          <text attributes={TextAttributes.DIM}>
            No prompt provided or loading stream...
          </text>
        )}

        {/* Live streaming content or completed output */}
        {(isLoading || completion) && (
          <box flexDirection="column">
            <text fg="green" attributes={TextAttributes.BOLD} marginBottom={1}>
              ● AI Response:
            </text>
            {isLoading && !completion ? (
              <text attributes={TextAttributes.DIM}>Thinking...</text>
            ) : (
              <text>{completion}</text>
            )}
          </box>
        )}

        {error && (
          <box flexDirection="column">
            <text fg="red" attributes={TextAttributes.BOLD}>
              ● Error:
            </text>
            <text fg="red" marginLeft={2}>
              {error.message || String(error)}
            </text>
          </box>
        )}
      </scrollbox>
    </box>
  );
}
