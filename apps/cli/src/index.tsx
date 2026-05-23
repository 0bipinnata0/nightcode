import { createCliRenderer } from "@opentui/core";
import { createRoot } from "@opentui/react";
import { createWelcomeMessage, projectDescription, projectName } from "@nightcode/shared";

function App() {
  return (
    <box
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
      padding={2}
      backgroundColor="#111827"
    >
      <ascii-font text={projectName} font="block" color="#7dd3fc" />
      <box marginTop={1} border borderColor="#38bdf8" paddingX={2} paddingY={1}>
        <text fg="#e5e7eb">
          <strong>{createWelcomeMessage("cli")}</strong>
        </text>
      </box>
      <box marginTop={1}>
        <text fg="#94a3b8">
          {projectDescription}
          <br />
          Server: <span fg="#86efac">Hono on Bun</span>
          <br />
          CLI: <span fg="#c4b5fd">OpenTUI React</span>
        </text>
      </box>
      <box marginTop={2}>
        <text fg="#64748b">
          Press <strong>Ctrl+C</strong> to exit.
        </text>
      </box>
    </box>
  );
}

const renderer = await createCliRenderer({
  exitOnCtrlC: true,
});

createRoot(renderer).render(<App />);
