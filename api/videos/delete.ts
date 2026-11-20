import { del } from "@vercel/blob";
import { isVideoAdmin } from "../../lib/video-auth";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).json({ error: "Método não permitido." });
  if (!isVideoAdmin(req)) return res.status(401).json({ error: "Entre como administrador para excluir vídeos." });
  const pathname = String(req.body?.pathname || "");
  if (!pathname.startsWith("videos/") || pathname.includes("..")) return res.status(400).json({ error: "Arquivo inválido." });
  try {
    await del(pathname);
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(500).json({ error: "Não foi possível excluir o vídeo." });
  }
}
