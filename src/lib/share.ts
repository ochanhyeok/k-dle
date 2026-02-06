export async function shareResult(text: string): Promise<void> {
  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({ text });
      return;
    } catch {
      // User cancelled or share failed — fall through to clipboard
    }
  }
  await navigator.clipboard.writeText(text);
}
