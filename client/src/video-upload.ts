import { upload } from "@vercel/blob/client";

declare global {
  interface Window {
    DQVideoStorage?: {
      login(password: string): Promise<void>;
      logout(): Promise<void>;
      session(): Promise<boolean>;
      list(): Promise<Array<{ pathname: string; url: string; size: number; uploadedAt: string }>>;
      upload(file: File, onProgress?: (event: { percentage: number }) => void): Promise<unknown>;
      remove(pathname: string): Promise<void>;
    };
  }
}

async function jsonRequest(url: string, init?: RequestInit) {
  const response = await fetch(url, {
    credentials: "same-origin",
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    ...init,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "Falha na operação de vídeo.");
  return data;
}

window.DQVideoStorage = {
  async login(password) {
    await jsonRequest("/api/videos/login", {
      method: "POST",
      body: JSON.stringify({ password }),
    });
  },
  async logout() {
    await jsonRequest("/api/videos/logout", { method: "POST", body: "{}" });
  },
  async session() {
    const data = await jsonRequest("/api/videos/session");
    return Boolean(data.authenticated);
  },
  async list() {
    const data = await jsonRequest("/api/videos/list");
    return data.videos || [];
  },
  async upload(file, onProgress) {
    const safeName = file.name.normalize("NFKD").replace(/[^a-zA-Z0-9._-]+/g, "-").slice(-100);
    return upload(`videos/${Date.now()}-${safeName}`, file, {
      access: "public",
      handleUploadUrl: "/api/videos/upload",
      onUploadProgress: onProgress,
    });
  },
  async remove(pathname) {
    await jsonRequest("/api/videos/delete", {
      method: "POST",
      body: JSON.stringify({ pathname }),
    });
  },
};
window.dispatchEvent(new Event("dq-video-storage-ready"));
