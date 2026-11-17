import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Core Electric MEP Industries — New York electrical contractor";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
    const photo = await readFile(join(process.cwd(), "public/hero-manhattan-mep.png"));

    return new ImageResponse(
        (
            <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", position: "relative", background: "#1e293b", color: "#f8fafc", padding: "56px 64px" }}>
                {/* ImageResponse rasterizes an embedded local image rather than a Next.js image component. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={"data:image/png;base64," + photo.toString("base64")}
                    alt=""
                    width={1200}
                    height={630}
                    style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, objectFit: "cover" }}
                />
                <div style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, background: "linear-gradient(90deg, rgba(15,23,42,0.96) 0%, rgba(15,23,42,0.84) 52%, rgba(15,23,42,0.32) 100%)" }} />
                <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", position: "relative" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 44 }}>
                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                            <rect width="64" height="64" rx="14" fill="#1e293b" />
                            <path d="M40 17a20 20 0 1 0 0 30" stroke="#f8fafc" strokeWidth="7" strokeLinecap="round" />
                            <path d="M43 12 28 34h11l-6 19 21-27H42l6-14Z" fill="#f59e0b" />
                        </svg>
                        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                            <span style={{ fontSize: 30, fontWeight: 700, letterSpacing: -0.5 }}>CORE ELECTRIC</span>
                            <span style={{ fontSize: 18, letterSpacing: 4, color: "#cbd5e1" }}>MEP INDUSTRIES</span>
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", fontSize: 72, fontWeight: 700, lineHeight: 1.08, letterSpacing: -2 }}>
                        <span>New York Electrical</span>
                        <span style={{ color: "#f59e0b" }}>Contractor</span>
                    </div>
                    <div style={{ display: "flex", marginTop: 26, fontSize: 24, color: "#cbd5e1" }}>
                        Public · Commercial · Residential
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", fontSize: 18 }}>
                        <span style={{ color: "#f59e0b", fontWeight: 700 }}>MBE CERTIFIED · LOCAL #3 UNION</span>
                        <span style={{ color: "#cbd5e1" }}>www.coreelectricmep.com</span>
                    </div>
                </div>
            </div>
        ),
        size,
    );
}
