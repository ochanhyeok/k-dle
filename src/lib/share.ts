export async function shareResult(text: string): Promise<void> {
  await navigator.clipboard.writeText(text);
}
