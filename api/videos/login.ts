import { createVideoAdminCookie } from "../../lib/video-auth";

export default function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).json({ error: "Método não permitido." });
  const expected = process.env.VIDEO_ADMIN_PASSWORD;
  const supplied = String(req.body?.password || "");
  if (!expected || supplied.length !== expected.length) return res.status(401).json({ error: "Senha administrativa inválida." });
  const { timingSafeEqual } = require("node:crypto");
  if (!timingSafeEqual(Buffer.from(supplied), Buffer.from(expected))) return res.status(401).json({ error: "Senha administrativa inválida." });
  res.setHeader("Set-Cookie", createVideoAdminCookie(expected));
  return res.status(200).json({ ok: true });
}
