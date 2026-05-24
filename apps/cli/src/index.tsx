import { createCliRenderer } from "@opentui/core";
import { createRoot } from "@opentui/react";
import { HomeScreen } from "./screens/home-screen.js";

const renderer = await createCliRenderer({
  exitOnCtrlC: true,
});

createRoot(renderer).render(<HomeScreen />);
