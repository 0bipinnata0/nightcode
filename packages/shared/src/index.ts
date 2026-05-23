export const projectName = "Nightcode";

export const projectDescription = "A Bun workspace for an OpenCode-inspired CLI and server.";

export function createWelcomeMessage(target: "cli" | "server") {
  return `Welcome to ${projectName} ${target}`;
}
