export function centerText(
  text: string,
  width = process.stdout.columns || 80
): string {
  const padding = Math.floor((width - text.length) / 2);
  return ' '.repeat(Math.max(padding, 0)) + text;
}
