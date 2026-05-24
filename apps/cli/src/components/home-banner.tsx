type HomeBannerProps = {
  title: string;
};

export function HomeBanner({ title }: HomeBannerProps) {
  return (
    <box flexDirection="column" alignItems="center">
      <ascii-font text={title} font="block" color="#7dd3fc" />
    </box>
  );
}
