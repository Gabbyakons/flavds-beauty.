import crypto from "crypto";
import { cookies } from "next/headers";

export const COOKIE = "flavds_admin";
const secret = () => process.env.AUTH_SECRET || "dev-secret-change-me";
const sign = (v) => crypto.createHmac("sha256", secret()).update(v).digest("hex");

export function makeToken() {
  const exp = String(Date.now() + 7 * 24 * 3600 * 1000);
  return `${exp}.${sign(exp)}`;
}

export function passwordOk(input) {
  const real = process.env.ADMIN_PASSWORD || "admin123";
  const a = crypto.createHash("sha256").update(String(input)).digest();
  const b = crypto.createHash("sha256").update(real).digest();
  return crypto.timingSafeEqual(a, b);
}

export function isAdmin() {
  const token = cookies().get(COOKIE)?.value;
  if (!token) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  const good = sign(exp);
  return sig.length === good.length && crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(good));
}
