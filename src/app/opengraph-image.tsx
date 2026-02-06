import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "K-Dle — Daily K-Drama & K-Pop Guessing Game";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ fontSize: 72, marginBottom: 8, display: "flex" }}>
          🎬🎤📝🎭
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: "#fafafa",
            marginBottom: 16,
            display: "flex",
          }}
        >
          <span style={{ color: "#a78bfa" }}>K</span>-Dle
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#a1a1aa",
            textAlign: "center",
            maxWidth: 600,
            display: "flex",
          }}
        >
          Daily K-Drama & K-Pop Guessing Game
        </div>
        <div
          style={{
            display: "flex",
            gap: 24,
            marginTop: 40,
            fontSize: 18,
            color: "#71717a",
          }}
        >
          <span>Drama-dle</span>
          <span>·</span>
          <span>Idol-dle</span>
          <span>·</span>
          <span>Lyric-dle</span>
          <span>·</span>
          <span>Scene-dle</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
