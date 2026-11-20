import { isVideoAdmin } from "../../lib/video-auth";

export default function handler(req: any, res: any) {
  if (req.method !== "GET") return res.status(405).json({ error: "Método não permitido." });
  return res.status(200).json({ authenticated: isVideoAdmin(req) });
}
