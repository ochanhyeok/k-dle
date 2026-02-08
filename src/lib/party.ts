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

function generateCode(): string {
  return String(Math.floor(1000 + Math.random() * 9000));
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
  const code = generateCode();
  const party: Party = {
    code,
    mode,
    puzzleNumber,
    hostName,
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
    const playerId = getPlayerId();
    const playerData: PartyPlayer = {
      name: playerName,
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
