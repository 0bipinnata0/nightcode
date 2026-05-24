import { TextAttributes } from "@opentui/core";

export function AboutScreen() {
  return (
    <box flexDirection="column" flexGrow={1}>
      <text fg="cyan" attributes={TextAttributes.BOLD} marginBottom={1}>
        About
      </text>
      <text>
        Nightcode is a terminal application built with OpenTUI and React Router.
      </text>
      <box marginTop={1}>
        <text attributes={TextAttributes.DIM}>
          Use the footer shortcuts to navigate between screens.
        </text>
      </box>
    </box>
  );
}
