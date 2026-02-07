export type CellResult = "correct" | "wrong" | "partial";

export interface ShareCardData {
  mode: "drama" | "idol" | "lyric" | "scene";
  puzzleNumber: number;
  score: string;
  won: boolean;
  grid: CellResult[][];
  stats?: { played: number; winRate: number; streak: number };
}

const MODE_META: Record<string, { emoji: string; title: string; accent: string }> = {
  drama: { emoji: "🎬", title: "Drama-dle", accent: "#a855f7" },
  idol:  { emoji: "🎤", title: "Idol-dle",  accent: "#ec4899" },
  lyric: { emoji: "📝", title: "Lyric-dle", accent: "#3b82f6" },
  scene: { emoji: "🎭", title: "Scene-dle", accent: "#f59e0b" },
};

const CELL_COLORS: Record<CellResult, string> = {
  correct: "#22c55e",
  wrong:   "#ef4444",
  partial: "#eab308",
};

const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

function rrect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

export async function generateShareCard(data: ShareCardData): Promise<Blob> {
  const DPR = 2;
  const W = 480;
  const meta = MODE_META[data.mode];

  // Grid measurements
  const SQ = 36;
  const GAP = 5;
  const gridCols = Math.max(...data.grid.map((r) => r.length));
  const gridRows = data.grid.length;
  const gridW = gridCols * SQ + (gridCols - 1) * GAP;
  const gridH = gridRows * SQ + (gridRows - 1) * GAP;

  // Vertical layout
  let H = 40;    // top padding
  H += 28;       // brand
  H += 44;       // title
  H += 56;       // score
  H += gridH;    // grid
  H += 28;       // after grid
  if (data.stats) H += 52;
  H += 32;       // bottom padding

  const canvas = document.createElement("canvas");
  canvas.width = W * DPR;
  canvas.height = H * DPR;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(DPR, DPR);

  // ── Clip to card shape ──
  ctx.save();
  rrect(ctx, 0, 0, W, H, 20);
  ctx.clip();

  // Background gradient
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, "#0d0d1a");
  bg.addColorStop(1, "#151528");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Accent glow at top
  const glow = ctx.createRadialGradient(W / 2, -30, 0, W / 2, -30, W * 0.5);
  glow.addColorStop(0, meta.accent + "18");
  glow.addColorStop(1, "transparent");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H * 0.6);

  ctx.textAlign = "center";
  let y = 40;

  // Brand
  ctx.fillStyle = "rgba(255,255,255,0.25)";
  ctx.font = `600 12px ${FONT}`;
  ctx.fillText("K-Dle", W / 2, y + 12);
  y += 28;

  // Title
  ctx.fillStyle = "#ffffff";
  ctx.font = `700 22px ${FONT}`;
  ctx.fillText(`${meta.emoji}  ${meta.title}  #${data.puzzleNumber}`, W / 2, y + 28);
  y += 44;

  // Score
  ctx.fillStyle = data.won ? CELL_COLORS.correct : CELL_COLORS.wrong;
  ctx.font = `800 40px ${FONT}`;
  ctx.fillText(data.score, W / 2, y + 44);
  y += 56;

  // Grid
  const gridX = (W - gridW) / 2;
  for (let r = 0; r < gridRows; r++) {
    for (let c = 0; c < data.grid[r].length; c++) {
      const cx = gridX + c * (SQ + GAP);
      const cy = y + r * (SQ + GAP);
      rrect(ctx, cx, cy, SQ, SQ, 6);
      ctx.fillStyle = CELL_COLORS[data.grid[r][c]];
      ctx.fill();
    }
  }
  y += gridH + 28;

  // Stats
  if (data.stats) {
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(60, y);
    ctx.lineTo(W - 60, y);
    ctx.stroke();
    y += 18;

    ctx.fillStyle = "rgba(255,255,255,0.45)";
    ctx.font = `500 13px ${FONT}`;
    ctx.fillText(
      `${data.stats.played} played  ·  ${data.stats.winRate}% wins  ·  🔥 ${data.stats.streak} streak`,
      W / 2,
      y + 14,
    );
    y += 34;
  }

  ctx.restore();

  // Border
  rrect(ctx, 0.5, 0.5, W - 1, H - 1, 20);
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.lineWidth = 1;
  ctx.stroke();

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("toBlob failed"))),
      "image/png",
    );
  });
}
