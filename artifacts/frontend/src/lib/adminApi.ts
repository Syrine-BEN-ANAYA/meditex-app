const BASE = "/api/admin";

async function req<T>(method: string, path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: body ? { "Content-Type": "application/json" } : {},
    credentials: "include",
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<T>;
}

export const adminApi = {
  login: (password: string) => req<{ ok: boolean }>("POST", "/login", { password }),
  logout: () => req<{ ok: boolean }>("POST", "/logout"),
  session: () => req<{ authenticated: boolean }>("GET", "/session"),

  getContent: () => req<Array<{ key: string; valueEn: string; valueAr: string }>>("GET", "/content"),
  saveContent: (items: Array<{ key: string; valueEn: string; valueAr: string }>) =>
    req<{ ok: boolean }>("PUT", "/content", items),

  getCollections: () =>
    req<Array<{ id: string; titleEn: string; titleAr: string; subtitleEn: string; subtitleAr: string; coverImage?: string | null; displayOrder?: number | null }>>("GET", "/collections"),
  updateCollection: (id: string, data: object) => req<{ ok: boolean }>("PUT", `/collections/${id}`, data),

  getProducts: (collectionId: string) =>
    req<Array<{ id: string; collectionId: string; titleEn: string; titleAr: string; descEn: string; descAr: string; image?: string | null }>>("GET", `/collections/${collectionId}/products`),
  updateProduct: (id: string, data: object) => req<{ ok: boolean }>("PUT", `/products/${id}`, data),

  uploadImage: async (file: File): Promise<string> => {
    const form = new FormData();
    form.append("image", file);
    const res = await fetch(`${BASE}/upload`, { method: "POST", credentials: "include", body: form });
    if (!res.ok) throw new Error(await res.text());
    const { url } = await res.json() as { url: string };
    return url;
  },
};
