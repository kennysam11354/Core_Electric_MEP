import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { validateContact, sendContactEmail } from "@/lib/contact.mjs";

export const runtime = "nodejs";

// Best-effort protection per server instance, not a distributed rate limiter.
const attempts = new Map();
const windowMs = 10 * 60 * 1000;
const maxBodyBytes = 32768;

function rateLimited(request) {
    const now = Date.now();
    for (const [key, entry] of attempts) if (entry.resetAt <= now) attempts.delete(key);
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
    const key = createHash("sha256").update(ip).digest("hex");
    const entry = attempts.get(key);
    if (entry && entry.count >= 5) return true;
    if (!entry && attempts.size >= 1000) return true;
    attempts.set(key, { count: (entry?.count || 0) + 1, resetAt: entry?.resetAt || now + windowMs });
    return false;
}

async function readBody(request) {
    if (!request.body) throw new Error("invalid");
    const reader = request.body.getReader();
    const chunks = [];
    let size = 0;
    try {
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            size += value.byteLength;
            if (size > maxBodyBytes) {
                await reader.cancel();
                throw new Error("too_large");
            }
            chunks.push(Buffer.from(value));
        }
    } finally {
        reader.releaseLock();
    }
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

export async function POST(request) {
    const origin = request.headers.get("origin");
    const allowedOrigins = ["https://www.coreelectricmep.com", "https://coreelectricmep.com"];
    if (process.env.NODE_ENV === "development") {
        allowedOrigins.push("http://localhost:3000", "http://127.0.0.1:3000");
    }
    if (!origin || !allowedOrigins.includes(origin)) {
        return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }
    if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
        return NextResponse.json({ error: "invalid_request" }, { status: 415 });
    }
    let body;
    try {
        body = await readBody(request);
    } catch (error) {
        return NextResponse.json({ error: "invalid_request" }, { status: error.message === "too_large" ? 413 : 400 });
    }
    if (typeof body?.website === "string" && body.website.trim()) {
        return NextResponse.json({ ok: true });
    }
    const data = validateContact(body);
    if (!data) return NextResponse.json({ error: "invalid_fields" }, { status: 422 });
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "unavailable" }, { status: 503 });
    if (rateLimited(request)) {
        return NextResponse.json({ error: "rate_limited" }, { status: 429, headers: { "Retry-After": "600" } });
    }
    try {
        await sendContactEmail(data, { apiKey, from: process.env.RESEND_FROM || undefined });
        return NextResponse.json({ ok: true });
    } catch {
        return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
    }
}
