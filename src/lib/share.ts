export type ShareOutcome = "shared" | "copied";

export async function shareResult(text: string): Promise<ShareOutcome> {
  if (navigator.share) {
    try {
      await navigator.share({ text });
      return "shared";
    } catch (e) {
      // User cancelled or share failed — fall through to clipboard
      if (e instanceof Error && e.name === "AbortError") {
        throw e; // User explicitly cancelled, don't copy either
      }
    }
  }

  await navigator.clipboard.writeText(text);
  return "copied";
}
