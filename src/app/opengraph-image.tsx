import { ImageResponse } from "next/og";
import { site } from "@/content";

export const alt = `${site.name}, ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The link preview, in the site's dark palette: warm black with the two lights. Next also uses it for Twitter.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between",
          padding: "64px 72px", color: "#efe7d8", backgroundColor: "#0b0a09",
          backgroundImage:
            "radial-gradient(circle at 86% 22%, rgba(150, 58, 22, 0.75), rgba(11, 10, 9, 0) 55%), radial-gradient(circle at 6% 100%, rgba(14, 62, 72, 0.8), rgba(11, 10, 9, 0) 55%)",
        }}
      >
        <div style={{ display: "flex", fontSize: 24, fontWeight: 700, letterSpacing: 2 }}>
          {site.name.toUpperCase()} · {site.role.toUpperCase()} · JAKARTA
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 76, lineHeight: 1.08, letterSpacing: -2.5 }}>
          <div style={{ display: "flex" }}>CI/CD pipelines,</div>
          <div style={{ display: "flex", color: "#b9d3ae" }}>Kubernetes on AWS EKS,</div>
          <div style={{ display: "flex" }}>Terraform infrastructure.</div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "rgba(239, 231, 216, 0.72)" }}>teukufazariz.vercel.app</div>
      </div>
    ),
    size,
  );
}
