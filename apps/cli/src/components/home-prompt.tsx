export function HomePrompt() {
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
          placeholder="Ask Nightcode to inspect code, make a plan, or start building..."
          width={66}
          height={5}
          focused
          wrapMode="word"
        />
      </box>
    </box>
  );
}
