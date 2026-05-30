import { useNavigate } from "react-router";
import { useRef } from "react";

const textareaKeyBindings = [
  { name: "return", action: "submit" as const },
  { name: "kpenter", action: "submit" as const },
  { name: "linefeed", action: "submit" as const },
  { name: "return", shift: true, action: "newline" as const },
  { name: "kpenter", shift: true, action: "newline" as const },
];

export function HomePrompt() {
  const navigate = useNavigate();
  const textareaRef = useRef<any>(null);

  const handleSubmit = () => {
    const text = textareaRef.current?.plainText || "";
    navigate("/chat", { state: { text } });
  };

  return (
    <box
      flexDirection="column"
      width={72}
      marginTop={2}
      border
      borderStyle="rounded"
      borderColor="#38bdf8"
      paddingX={2}
      paddingY={1}
      backgroundColor="#0f172a"
    >
      <text fg="#bae6fd">
        <strong>What do you want to build?</strong>
      </text>
      <box marginTop={1}>
        <textarea
          ref={textareaRef}
          placeholder="Ask Nightcode to inspect code, make a plan, or start building..."
          width={66}
          height={5}
          focused
          wrapMode="word"
          keyBindings={textareaKeyBindings}
          onSubmit={handleSubmit}
        />
      </box>
    </box>
  );
}

