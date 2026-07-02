import { useEffect, useState, useRef } from "react";
import { adminApi } from "../../lib/adminApi";
import { content as staticContent } from "../../lib/data";

type Collection = {
  id: string; titleEn: string; titleAr: string; subtitleEn: string; subtitleAr: string;
  coverImage?: string | null; displayOrder?: number | null;
};
type Product = {
  id: string; collectionId: string; titleEn: string; titleAr: string;
  descEn: string; descAr: string; image?: string | null; displayOrder?: number | null;
};

const COLLECTION_IDS = ["corporate", "healthcare", "hospitality", "industrial", "security", "school"];
const assetImages = import.meta.glob<{ default: string }>("../../assets/*", { eager: true });

function imageSrc(image?: string | null) {
  if (!image) return "";
  if (image.startsWith("blob:") || image.startsWith("/") || image.startsWith("http")) return image;
  return assetImages[`../../assets/${image}`]?.default || `/src/assets/${image}`;
}

function staticCollection(id: string): Collection {
  const c = (staticContent.en.collections as Record<string, { title: string; subtitle: string }>)[id];
  const ca = (staticContent.ar.collections as Record<string, { title: string; subtitle: string }>)[id];
  const card = staticContent.en.products.items.find(item => item.id === id);
  return {
    id,
    titleEn: c?.title || "",
    titleAr: ca?.title || "",
    subtitleEn: c?.subtitle || "",
    subtitleAr: ca?.subtitle || "",
    coverImage: card?.img || null,
    displayOrder: COLLECTION_IDS.indexOf(id),
  };
}

function staticProducts(collectionId: string): Product[] {
  const col = (staticContent.en.collections as Record<string, { items: Array<{ id: string; title: string; titleAr: string; desc: string; descAr: string; img: string }> }>)[collectionId];
  return (col?.items || []).map((it, i) => ({
    id: `${collectionId}-${it.id}`,
    collectionId,
    titleEn: it.title,
    titleAr: it.titleAr,
    descEn: it.desc,
    descAr: it.descAr,
    image: it.img,
    displayOrder: i,
  }));
}

function ImageUpload({ current, onUploaded }: { current?: string | null; onUploaded: (url: string) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(current || null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const localPreview = URL.createObjectURL(file);
      setPreview(localPreview);
      const url = await adminApi.uploadImage(file);
      onUploaded(url);
    } catch (err) {
      alert("Error during upload");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex items-center gap-3">
      {preview && (
        <img
          src={imageSrc(preview)}
          alt="preview"
          className="w-14 h-14 object-cover rounded-lg border border-gray-200"
          onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
      )}
      <button
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
        className="text-xs px-3 py-1.5 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition"
      >
        {uploading ? "Uploading..." : "Change image"}
      </button>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  );
}

export default function AdminCollections() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [products, setProducts] = useState<Record<string, Product[]>>({});
  const [openId, setOpenId] = useState<string | null>(null);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const dbCols = await adminApi.getCollections();
        const dbMap = new Map(dbCols.map(c => [c.id, c]));
        setCollections(COLLECTION_IDS.map(id => dbMap.get(id) || staticCollection(id)));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function loadProducts(id: string) {
    if (products[id]) return;
    const dbProds = await adminApi.getProducts(id);
    if (dbProds.length > 0) {
      setProducts(prev => ({ ...prev, [id]: dbProds }));
    } else {
      setProducts(prev => ({ ...prev, [id]: staticProducts(id) }));
    }
  }

  async function toggleOpen(id: string) {
    if (openId === id) { setOpenId(null); return; }
    setOpenId(id);
    await loadProducts(id);
  }

  function updateCollection(id: string, field: keyof Collection, val: string) {
    setCollections(prev => prev.map(c => c.id === id ? { ...c, [field]: val } : c));
  }

  function updateProduct(collectionId: string, productId: string, field: keyof Product, val: string) {
    setProducts(prev => ({
      ...prev,
      [collectionId]: (prev[collectionId] || []).map(p => p.id === productId ? { ...p, [field]: val } : p),
    }));
  }

  async function saveCollection(id: string) {
    const col = collections.find(c => c.id === id);
    if (!col) return;
    setSaving(id);
    try {
      await adminApi.updateCollection(id, col);
      const prods = products[id] || [];
      for (const p of prods) {
        await adminApi.updateProduct(p.id, { ...p, collectionId: id });
      }
      setSaved(id);
      setTimeout(() => setSaved(null), 3000);
    } finally {
      setSaving(null);
    }
  }

  if (loading) return <div className="p-8 text-gray-500">Loading...</div>;

  const col = collections.find(c => c.id === openId);
  const prods = openId ? (products[openId] || []) : [];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Collections & Products</h1>
        <p className="text-gray-500 mt-1">Manage collection cards, cover images, product texts and product images</p>
      </div>

      <div className="space-y-3">
        {collections.map(c => (
          <div key={c.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <button
              onClick={() => toggleOpen(c.id)}
              className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-4">
                {c.coverImage && (
                  <img
                    src={imageSrc(c.coverImage)}
                    alt=""
                    className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                    onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                )}
                <span className="w-8 h-8 bg-[var(--color-primary)] bg-opacity-10 rounded-lg flex items-center justify-center text-[var(--color-primary)] font-bold text-xs uppercase">
                  {c.id.slice(0, 2)}
                </span>
                <div>
                  <p className="font-semibold text-gray-900">{c.titleEn || c.id}</p>
                  <p className="text-sm text-gray-500">{c.titleAr}</p>
                </div>
              </div>
              <svg
                className={`w-5 h-5 text-gray-400 transition ${openId === c.id ? "rotate-180" : ""}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {openId === c.id && col && (
              <div className="border-t border-gray-100 px-6 py-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { field: "titleEn" as const, label: "Title (EN)", dir: "ltr" },
                    { field: "titleAr" as const, label: "Title (AR)", dir: "rtl" },
                    { field: "subtitleEn" as const, label: "Subtitle (EN)", dir: "ltr" },
                    { field: "subtitleAr" as const, label: "Subtitle (AR)", dir: "rtl" },
                  ].map(f => (
                    <div key={f.field}>
                      <label className="block text-xs text-gray-500 mb-1">{f.label}</label>
                      <input
                        value={col[f.field] as string || ""}
                        onChange={e => updateCollection(c.id, f.field, e.target.value)}
                        dir={f.dir}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-2">Cover Image</p>
                  <ImageUpload
                    current={col.coverImage}
                    onUploaded={url => updateCollection(c.id, "coverImage", url)}
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-800 mb-4">Products ({prods.length})</p>
                  <div className="space-y-4">
                    {prods.map(p => (
                      <div key={p.id} className="border border-gray-200 rounded-xl p-4 space-y-3">
                        <div className="flex items-start gap-3">
                          <ImageUpload
                            current={p.image}
                            onUploaded={url => updateProduct(c.id, p.id, "image", url)}
                          />
                          <div className="flex-1 grid grid-cols-2 gap-3">
                            {[
                              { field: "titleEn" as const, label: "Name (EN)", dir: "ltr" },
                              { field: "titleAr" as const, label: "Name (AR)", dir: "rtl" },
                            ].map(f => (
                              <div key={f.field}>
                                <label className="block text-xs text-gray-500 mb-1">{f.label}</label>
                                <input
                                  value={p[f.field] as string || ""}
                                  onChange={e => updateProduct(c.id, p.id, f.field, e.target.value)}
                                  dir={f.dir}
                                  className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                                />
                              </div>
                            ))}
                            {[
                              { field: "descEn" as const, label: "Description (EN)", dir: "ltr" },
                              { field: "descAr" as const, label: "Description (AR)", dir: "rtl" },
                            ].map(f => (
                              <div key={f.field}>
                                <label className="block text-xs text-gray-500 mb-1">{f.label}</label>
                                <textarea
                                  value={p[f.field] as string || ""}
                                  onChange={e => updateProduct(c.id, p.id, f.field, e.target.value)}
                                  dir={f.dir}
                                  rows={2}
                                  className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent resize-none"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
                  {saved === c.id && <span className="text-green-600 text-sm font-medium self-center">✓ Saved!</span>}
                  <button
                    onClick={() => saveCollection(c.id)}
                    disabled={saving === c.id}
                    className="bg-[var(--color-primary)] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-opacity-90 transition disabled:opacity-60"
                  >
                    {saving === c.id ? "Saving..." : "Save this collection"}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
