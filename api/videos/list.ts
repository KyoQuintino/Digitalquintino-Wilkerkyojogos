import { list } from "@vercel/blob";

export default async function handler(req: any, res: any) {
  if (req.method !== "GET") return res.status(405).json({ error: "Método não permitido." });
  try {
    const result = await list({ prefix: "videos/" });
    const videos = result.blobs.map((blob: any) => {
      const parts = String(blob.pathname).split("/");
      const category = parts.length > 2 ? parts[1] : "sem-categoria";
      const filename = parts[parts.length - 1] || "video";
      const withoutTimestamp = filename.replace(/^\\d+-/, "");
      const title = decodeURIComponent(withoutTimestamp.replace(/\\.[^.]+$/, "")).replace(/[-_]+/g, " ").trim() || "Vídeo sem título";
      return {
        pathname: blob.pathname,
        url: blob.url,
        size: blob.size,
        uploadedAt: blob.uploadedAt,
        category,
        title,
      };
    });
    return res.status(200).json({ videos });
  } catch {
    return res.status(500).json({ error: "Não foi possível listar os vídeos." });
  }
}
