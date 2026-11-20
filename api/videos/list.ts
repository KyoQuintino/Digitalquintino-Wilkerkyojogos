import { list } from "@vercel/blob";

export default async function handler(req: any, res: any) {
  if (req.method !== "GET") return res.status(405).json({ error: "Método não permitido." });
  try {
    const result = await list({ prefix: "videos/" });
    const videos = result.blobs.map((blob: any) => ({
      pathname: blob.pathname,
      url: blob.url,
      size: blob.size,
      uploadedAt: blob.uploadedAt,
    }));
    return res.status(200).json({ videos });
  } catch {
    return res.status(500).json({ error: "Não foi possível listar os vídeos." });
  }
}
