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
): Promise<"shared" | "copied" | "cancelled"> {
  const file = new File([imageBlob], "k-dle-result.png", { type: "image/png" });

  // Try Web Share API with file (mobile)
  if (navigator.share) {
    try {
      const shareData = { files: [file], text: fallbackText };
      if (!navigator.canShare || navigator.canShare(shareData)) {
        await navigator.share(shareData);
        // Copy link to clipboard — KakaoTalk etc. only show the image
        try { await navigator.clipboard.writeText(fallbackText); } catch {}
        return "shared";
      }
    } catch (e) {
      // User dismissed share sheet
      if (e instanceof DOMException && e.name === "AbortError") {
        return "cancelled";
      }
      // Other error — fall through to clipboard
    }
  }

  // Desktop fallback: copy image to clipboard
  try {
    await navigator.clipboard.write([
      new ClipboardItem({ "image/png": imageBlob }),
    ]);
    return "copied";
  } catch {
    await navigator.clipboard.writeText(fallbackText);
    return "copied";
  }
}
