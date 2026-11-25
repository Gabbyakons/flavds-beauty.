import crypto from "crypto";
import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { isAdmin } from "../../../lib/auth";
import { UPLOAD_DIR } from "../../../lib/store";

const TYPES = { "image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp" };

export async function POST(req) {
  if (!isAdmin()) return NextResponse.json({ error: "Not allowed" }, { status: 401 });
  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "No image received" }, { status: 400 });
  }
  const ext = TYPES[file.type];
  if (!ext) return NextResponse.json({ error: "Use a JPG, PNG or WebP image" }, { status: 400 });
  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "Image is larger than 5 MB" }, { status: 400 });
  }
  const name = crypto.randomBytes(10).toString("hex") + ext;
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  await fs.writeFile(path.join(UPLOAD_DIR, name), Buffer.from(await file.arrayBuffer()));
  return NextResponse.json({ url: `/api/uploads/${name}` });
}
