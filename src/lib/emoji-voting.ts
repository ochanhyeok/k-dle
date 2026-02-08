import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, increment } from "firebase/firestore";

export type EmojiReaction = "fire" | "hard" | "perfect" | "skull" | "shocked";

export const EMOJI_OPTIONS: { key: EmojiReaction; emoji: string }[] = [
  { key: "fire", emoji: "🔥" },
  { key: "hard", emoji: "😅" },
  { key: "perfect", emoji: "🎉" },
  { key: "skull", emoji: "💀" },
  { key: "shocked", emoji: "🤯" },
];

export interface EmojiVotesData {
  fire: number;
  hard: number;
  perfect: number;
  skull: number;
  shocked: number;
}

function getTodayKey(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function getDocId(mode: string): string {
  return `${getTodayKey()}_${mode}`;
}

function getVotedKey(mode: string): string {
  return `k-dle-emoji-${mode}-${getTodayKey()}`;
}

export function getLocalVote(mode: string): EmojiReaction | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(getVotedKey(mode)) as EmojiReaction | null;
}

const VALID_MODES = ["drama", "idol", "lyric", "scene"];
const VALID_REACTIONS: EmojiReaction[] = ["fire", "hard", "perfect", "skull", "shocked"];

export async function submitEmojiVote(
  mode: string,
  reaction: EmojiReaction
): Promise<void> {
  try {
    if (typeof window === "undefined") return;
    if (!VALID_MODES.includes(mode)) return;
    if (!VALID_REACTIONS.includes(reaction)) return;
    if (localStorage.getItem(getVotedKey(mode))) return;

    const docRef = doc(db, "emoji-votes", getDocId(mode));
    await setDoc(docRef, { [reaction]: increment(1) }, { merge: true });
    localStorage.setItem(getVotedKey(mode), reaction);
  } catch {
    // Silent fail
  }
}

export async function fetchEmojiVotes(mode: string): Promise<EmojiVotesData | null> {
  try {
    const docRef = doc(db, "emoji-votes", getDocId(mode));
    const snap = await getDoc(docRef);
    if (!snap.exists()) return null;
    const data = snap.data();
    return {
      fire: data.fire || 0,
      hard: data.hard || 0,
      perfect: data.perfect || 0,
      skull: data.skull || 0,
      shocked: data.shocked || 0,
    };
  } catch {
    return null;
  }
}
