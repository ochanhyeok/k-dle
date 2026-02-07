import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sizeParam = searchParams.get("size");
  const size = sizeParam ? parseInt(sizeParam, 10) : 192;
  const validSize = [192, 512].includes(size) ? size : 192;

  const borderRadius = Math.round(validSize * 0.1);
  const fontSize = Math.round(validSize * 0.65);

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius,
          fontSize,
          fontWeight: 900,
          color: "#a78bfa",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        K
      </div>
    ),
    { width: validSize, height: validSize }
  );
}
