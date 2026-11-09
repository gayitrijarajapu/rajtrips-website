import { ImageResponse } from "next/og";
import { site } from "@/lib/site";
export const alt = "rajtrips — A better way to get there";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: 72,
        background: "#d6eaf6",
        color: "#142a38",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ fontSize: 32 }}>{site.name}</div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 88,
          lineHeight: 1.05,
          letterSpacing: -5,
        }}
      >
        Great journeys.
        <br />
        Beautifully simple.
      </div>
      <div style={{ fontSize: 25 }}>
        Car rentals · Airport transfers · Outstation trips
      </div>
    </div>,
    size,
  );
}
