import {
  createCliRenderer,
  type KeyEvent,
  TextAttributes,
} from "@opentui/core";
import { useKeyboard, useRenderer } from "@opentui/react";
import { Outlet, useLocation, useNavigate } from "react-router";

export function RootLayout() {
  const renderer = useRenderer();
  const navigate = useNavigate();
  const location = useLocation();

  useKeyboard((event: KeyEvent) => {
    if (event.name === "1") navigate("/");
    if (event.name === "2") navigate("/about");
    if (event.name === "3") navigate("/settings");
    if (event.name === "q") renderer.destroy();
  });

  return (
    <box flexDirection="column" flexGrow={1}>
      <box
        flexDirection="row"
        justifyContent="space-between"
        paddingLeft={1}
        paddingRight={1}
        borderStyle="single"
        border={["bottom"]}
      >
        <text attributes={TextAttributes.BOLD}>Nightcode CLI</text>
        <text attributes={TextAttributes.DIM}>
          Current: {location.pathname}
        </text>
      </box>

      <box flexGrow={1} padding={1}>
        <Outlet />
      </box>

      <box
        flexDirection="row"
        justifyContent="center"
        gap={2}
        paddingTop={1}
        paddingBottom={1}
        borderStyle="single"
        border={["top"]}
      >
        <text
          attributes={
            location.pathname === "/"
              ? TextAttributes.BOLD | TextAttributes.UNDERLINE
              : TextAttributes.NONE
          }
        >
          [1] Home
        </text>
        <text
          attributes={
            location.pathname === "/about"
              ? TextAttributes.BOLD | TextAttributes.UNDERLINE
              : TextAttributes.NONE
          }
        >
          [2] About
        </text>
        <text
          attributes={
            location.pathname === "/settings"
              ? TextAttributes.BOLD | TextAttributes.UNDERLINE
              : TextAttributes.NONE
          }
        >
          [3] Settings
        </text>
        <text attributes={TextAttributes.DIM}>[q] Quit</text>
      </box>
    </box>
  );
}
