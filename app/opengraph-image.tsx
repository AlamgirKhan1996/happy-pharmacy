import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";
export const alt = "Happy Pharmacy — health, wellness and everyday care";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08783E",
          color: "#F7FAF8",
          padding: "72px",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: "0.16em", textTransform: "uppercase" }}>
          Happy Pharmacy
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 72, lineHeight: 1.05, fontWeight: 700 }}>
            Health, wellness and everyday care
          </div>
        </div>
      </div>
    ),
    size,
  );
}
