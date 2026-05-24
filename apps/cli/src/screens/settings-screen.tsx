import { TextAttributes } from "@opentui/core";
import { useEffect, useState } from "react";
import { client } from "../lib/client";

export function SettingsScreen() {
  const [health, setHealth] = useState<string>("checking...");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const res = await client.health.$get();
      if (cancelled) return;
      if (!res.ok) { setHealth("error"); return; }

      const data = await res.json();
      setHealth(data.status);
    }

    load();
    return () => { cancelled = true };
  }, []);

  return (
    <box flexDirection="column" flexGrow={1}>
      <text fg="cyan" attributes={TextAttributes.BOLD} marginBottom={1}>
        Settings
      </text>
      <box flexDirection="column" marginBottom={1}>
        <text>Theme: Dark</text>
        <text>Notifications: Enabled</text>
        <text>Server health: {health}</text>
      </box>
      <text attributes={TextAttributes.DIM}>
        (Settings are for demonstration only)
      </text>
    </box>
  );
}
