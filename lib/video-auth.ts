import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE_NAME = "dq_video_admin";
const SESSION_SECONDS = 12 * 60 * 60;

function signature(timestamp: string, secret: string) {
  return createHmac("sha256", secret).update(timestamp).digest("hex");
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function isVideoAdmin(req: any) {
  const secret = process.env.VIDEO_ADMIN_PASSWORD;
  if (!secret) return false;
  const cookieHeader = String(req.headers?.cookie || "");
  const cookie = cookieHeader.split(";").map((part: string) => part.trim()).find((part: string) => part.startsWith(COOKIE_NAME + "="));
  if (!cookie) return false;
  const token = decodeURIComponent(cookie.slice(COOKIE_NAME.length + 1));
  const [timestamp, suppliedSignature] = token.split(".");
  if (!timestamp || !suppliedSignature || !/^\d+$/.test(timestamp)) return false;
  const age = Math.floor(Date.now() / 1000) - Number(timestamp);
  if (age < 0 || age > SESSION_SECONDS) return false;
  return safeEqual(signature(timestamp, secret), suppliedSignature);
}

export function createVideoAdminCookie(secret: string) {
  const timestamp = String(Math.floor(Date.now() / 1000));
  const token = `${timestamp}.${signature(timestamp, secret)}`;
  return `${COOKIE_NAME}=${encodeURIComponent(token)}; HttpOnly; Secure; SameSite=Strict; Path=/api/videos; Max-Age=${SESSION_SECONDS}`;
}

export const expiredVideoAdminCookie = `${COOKIE_NAME}=; HttpOnly; Secure; SameSite=Strict; Path=/api/videos; Max-Age=0`;
