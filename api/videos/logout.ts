import { expiredVideoAdminCookie } from "../../lib/video-auth.js";

export default function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).json({ error: "Método não permitido." });
  res.setHeader("Set-Cookie", expiredVideoAdminCookie);
  return res.status(200).json({ ok: true });
}
