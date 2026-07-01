import { useEffect, useState } from "react";
import { adminApi } from "../../lib/adminApi";
import { content as staticContent } from "../../lib/data";

type ContentItem = { key: string; label: string; valueEn: string; valueAr: string; multiline?: boolean };

const CONTENT_KEYS: Array<{ section: string; items: Array<{ key: string; label: string; multiline?: boolean }> }> = [
  {
    section: "Hero",
    items: [
      { key: "hero.title", label: "Main Title" },
      { key: "hero.subtitle", label: "Subtitle" },
      { key: "hero.description", label: "Description", multiline: true },
      { key: "hero.cta", label: "CTA Button" },
    ],
  },
  {
    section: "About",
    items: [
      { key: "about.title", label: "Title" },
      { key: "about.description", label: "Description", multiline: true },
    ],
  },
  {
    section: "Why Us",
    items: [{ key: "whyUs.title", label: "Title" }],
  },
  {
    section: "Contact",
    items: [
      { key: "contact.title", label: "Title" },
      { key: "contact.subtitle", label: "Subtitle" },
    ],
  },
  {
    section: "Footer",
    items: [{ key: "footer.tagline", label: "Tagline" }],
  },
];

function getStaticValue(key: string, lang: "en" | "ar"): string {
  const parts = key.split(".");
  let obj: Record<string, unknown> = staticContent[lang] as Record<string, unknown>;
  for (const p of parts) {
    if (obj && typeof obj === "object" && p in obj) {
      obj = obj[p] as Record<string, unknown>;
    } else return "";
  }
  return typeof obj === "string" ? obj : "";
}

export default function AdminContent() {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const dbRows = await adminApi.getContent();
        const dbMap = new Map(dbRows.map(r => [r.key, r]));
        const allItems: ContentItem[] = CONTENT_KEYS.flatMap(section =>
          section.items.map(item => {
            const db = dbMap.get(item.key);
            return {
              key: item.key,
              label: item.label,
              multiline: item.multiline,
              valueEn: db?.valueEn || getStaticValue(item.key, "en"),
              valueAr: db?.valueAr || getStaticValue(item.key, "ar"),
            };
          })
        );
        setItems(allItems);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  function updateItem(key: string, lang: "en" | "ar", val: string) {
    setItems(prev => prev.map(i => i.key === key ? { ...i, [lang === "en" ? "valueEn" : "valueAr"]: val } : i));
  }

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    try {
      await adminApi.saveContent(items.map(i => ({ key: i.key, valueEn: i.valueEn, valueAr: i.valueAr })));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="p-8 text-gray-500">Loading...</div>;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Texts & Content</h1>
          <p className="text-gray-500 mt-1">Edit the site texts in English and Arabic</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="text-green-600 text-sm font-medium">✓ Saved!</span>}
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-[var(--color-primary)] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-opacity-90 transition disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {CONTENT_KEYS.map(section => {
          return (
            <div key={section.section} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                <h2 className="font-semibold text-gray-800">{section.section}</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {section.items.map(meta => {
                  const item = items.find(i => i.key === meta.key);
                  if (!item) return null;
                  return (
                    <div key={meta.key} className="p-6">
                      <p className="text-sm font-medium text-gray-700 mb-3">{meta.label}</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">🇬🇧 English</label>
                          {meta.multiline ? (
                            <textarea
                              value={item.valueEn}
                              onChange={e => updateItem(item.key, "en", e.target.value)}
                              rows={3}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent resize-none"
                            />
                          ) : (
                            <input
                              value={item.valueEn}
                              onChange={e => updateItem(item.key, "en", e.target.value)}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                            />
                          )}
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">🇸🇦 Arabic</label>
                          {meta.multiline ? (
                            <textarea
                              value={item.valueAr}
                              onChange={e => updateItem(item.key, "ar", e.target.value)}
                              rows={3}
                              dir="rtl"
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent resize-none font-arabic"
                            />
                          ) : (
                            <input
                              value={item.valueAr}
                              onChange={e => updateItem(item.key, "ar", e.target.value)}
                              dir="rtl"
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent font-arabic"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}