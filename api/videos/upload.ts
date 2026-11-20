import { handleUpload } from "@vercel/blob/client";
import { isVideoAdmin } from "../../lib/video-auth";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).json({ error: "Método não permitido." });
  if (!isVideoAdmin(req)) return res.status(401).json({ error: "Entre como administrador para enviar vídeos." });
  try {
    const result = await handleUpload({
      body: req.body,
      request: req,
      onBeforeGenerateToken: async (pathname: string) => {
        if (!pathname.startsWith("videos/")) throw new Error("Destino de vídeo inválido.");
        if (!isVideoAdmin(req)) throw new Error("Sessão administrativa expirada.");
        return {
          allowedContentTypes: ["video/mp4", "video/webm", "video/quicktime"],
          maximumSizeInBytes: 200 * 1024 * 1024,
          addRandomSuffix: true,
          validUntil: Date.now() + 10 * 60 * 1000,
        };
      },
    });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: error instanceof Error ? error.message : "Falha ao preparar o envio." });
  }
}
