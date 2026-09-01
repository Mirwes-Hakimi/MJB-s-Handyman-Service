import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Placeholder favicon: charcoal/green monogram matching the navbar brand colors
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#4B4B4B",
          color: "#C3D021",
          fontSize: 18,
          fontWeight: 700,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        MJB
      </div>
    ),
    { ...size }
  );
}
