import { createCliRenderer } from "@opentui/core";
import { createRoot } from "@opentui/react";
import { projectDescription, projectName } from "@nightcode/shared";
import { HomeBanner } from "./components/home-banner.js";
import { HomePrompt } from "./components/home-prompt.js";

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
      <HomeBanner title={projectName} />
      <HomePrompt />
      <box marginTop={1} border borderColor="#38bdf8" paddingX={2} paddingY={1}>
        <text fg="#e5e7eb">
          <strong>Ready for agentic development.</strong>
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
