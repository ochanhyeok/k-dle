import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export type PartyMode = "drama-dle" | "idol-dle" | "lyric-dle" | "scene-dle";

export interface PartyPlayer {
  name: string;
  guessCount: number;
  won: boolean;
  completedAt: number; // timestamp
}

export interface Party {
  code: string;
  mode: PartyMode;
  puzzleNumber: number;
  hostName: string;
  createdAt: number;
  players: Record<string, PartyPlayer>;
}

const PARTY_ID_KEY = "k-dle-party-id";
const VALID_PARTY_MODES: PartyMode[] = ["drama-dle", "idol-dle", "lyric-dle", "scene-dle"];
const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // I/O/0/1 제외 (혼동 방지)
const CODE_LENGTH = 6;
const CODE_REGEX = /^[A-Z0-9]{6}$/;

function generateCode(): string {
  const values = new Uint8Array(CODE_LENGTH);
  crypto.getRandomValues(values);
  return Array.from(values, v => CODE_CHARS[v % CODE_CHARS.length]).join("");
}

function getPlayerId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem(PARTY_ID_KEY);
  if (!id) {
    id = Math.random().toString(36).substring(2, 10);
    localStorage.setItem(PARTY_ID_KEY, id);
  }
  return id;
}

export async function createParty(
  mode: PartyMode,
  puzzleNumber: number,
  hostName: string
): Promise<string> {
  const trimmed = hostName.trim();
  if (!VALID_PARTY_MODES.includes(mode)) throw new Error("Invalid mode");
  if (!trimmed || trimmed.length > 20) throw new Error("Invalid host name");

  const code = generateCode();
  const party: Party = {
    code,
    mode,
    puzzleNumber,
    hostName: trimmed,
    createdAt: Date.now(),
    players: {},
  };

  await setDoc(doc(db, "parties", code), party);
  return code;
}

export async function getParty(code: string): Promise<Party | null> {
  try {
    const snap = await getDoc(doc(db, "parties", code));
    if (!snap.exists()) return null;
    return snap.data() as Party;
  } catch {
    return null;
  }
}

export async function submitPartyResult(
  code: string,
  playerName: string,
  won: boolean,
  guessCount: number
): Promise<void> {
  try {
    if (!CODE_REGEX.test(code)) return;
    const trimmedName = playerName.trim();
    if (!trimmedName || trimmedName.length > 20) return;
    if (!Number.isInteger(guessCount) || guessCount < 1 || guessCount > 6) return;

    const playerId = getPlayerId();
    const playerData: PartyPlayer = {
      name: trimmedName,
      guessCount,
      won,
      completedAt: Date.now(),
    };

    await updateDoc(doc(db, "parties", code), {
      [`players.${playerId}`]: playerData,
    });
  } catch {
    // Silent fail
  }
}

export function getMyPlayerId(): string {
  return getPlayerId();
}
