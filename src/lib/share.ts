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

export async function shareWithImage(
  imageBlob: Blob,
  fallbackText: string,
): Promise<"shared" | "copied"> {
  const file = new File([imageBlob], "k-dle-result.png", { type: "image/png" });

  // Try Web Share API with file (mobile)
  if (navigator.share) {
    try {
      const shareData = { files: [file], text: fallbackText };
      if (!navigator.canShare || navigator.canShare(shareData)) {
        await navigator.share(shareData);
        return "shared";
      }
    } catch {
      // cancelled or unsupported — fall through
    }
  }

  // Try copying image to clipboard (desktop)
  try {
    await navigator.clipboard.write([
      new ClipboardItem({ "image/png": imageBlob }),
    ]);
    return "copied";
  } catch {
    // Image clipboard not supported — copy text
    await navigator.clipboard.writeText(fallbackText);
    return "copied";
  }
}
