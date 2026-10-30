import { ImageResponse } from "next/og";

export const alt = "Teuku Fazariz Basya, DevOps engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The link preview: the site's frame and type, black on white. Next also uses it for Twitter.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#fff", padding: 32 }}>
        <div
          style={{
            flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between",
            border: "1px solid #b5b5b5", padding: "56px 64px", color: "#000",
          }}
        >
          <div style={{ display: "flex", fontSize: 28, fontWeight: 700 }}>Teuku Fazariz Basya</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 112, letterSpacing: -4, lineHeight: 1 }}>DevOps engineer</div>
            <div style={{ fontSize: 34, color: "#6b6b6b", marginTop: 28 }}>
              CI/CD, Kubernetes and Terraform on AWS
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", fontSize: 24 }}>
            <div style={{ width: 14, height: 14, borderRadius: 7, background: "#e30000", marginRight: 12 }} />
            teukufazariz.vercel.app
          </div>
        </div>
      </div>
    ),
    size,
  );
}
