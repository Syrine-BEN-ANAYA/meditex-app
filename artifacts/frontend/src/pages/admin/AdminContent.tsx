import { useEffect, useState } from "react";
import { adminApi } from "../../lib/adminApi";
import { content as staticContent } from "../../lib/data";

type ContentItem = { key: string; label: string; valueEn: string; valueAr: string; multiline?: boolean };

const CONTENT_KEYS: Array<{ section: string; items: Array<{ key: string; label: string; multiline?: boolean }> }> = [
  {
    section: "Navigation",
    items: [
      { key: "nav.home", label: "Home link" },
      { key: "nav.about", label: "About link" },
      { key: "nav.products", label: "Products link" },
      { key: "nav.contact", label: "Contact link" },
    ],
  },
  {
    section: "Home / Hero",
    items: [
      { key: "hero.title", label: "Main Title" },
      { key: "hero.subtitle", label: "Subtitle" },
      { key: "hero.description", label: "Description", multiline: true },
      { key: "hero.cta", label: "CTA Button" },
      { key: "hero.ctaSub", label: "CTA Small Text" },
    ],
  },
  {
    section: "About - Main Texts",
    items: [
      { key: "about.title", label: "Title" },
      { key: "about.subtitle", label: "Subtitle" },
      { key: "about.description", label: "Homepage About Description", multiline: true },
      { key: "about.whoWeAreTitle", label: "Corporate Profile Label" },
      { key: "about.whoWeAreText1", label: "Corporate Profile Paragraph 1", multiline: true },
      { key: "about.whoWeAreText2", label: "Corporate Profile Paragraph 2", multiline: true },
      { key: "about.facilityTitle", label: "Facility Title" },
      { key: "about.facilityText", label: "Facility Text", multiline: true },
      { key: "about.lifecycleTitle", label: "Supply Programs Title" },
      { key: "about.lifecycleText", label: "Supply Programs Text", multiline: true },
      { key: "about.afterSalesTitle", label: "After-Sales Title" },
      { key: "about.afterSalesText", label: "After-Sales Text", multiline: true },
      { key: "about.visionTitle", label: "Vision Title" },
      { key: "about.visionText", label: "Vision Text", multiline: true },
      { key: "about.missionTitle", label: "Mission Title" },
      { key: "about.missionText", label: "Mission Text", multiline: true },
      { key: "about.sectorsTitle", label: "Sectors Title" },
      { key: "about.valuesTitle", label: "Values Title" },
    ],
  },
  {
    section: "About - Stats",
    items: [
      { key: "about.stats.0.value", label: "Stat 1 Value" },
      { key: "about.stats.0.label", label: "Stat 1 Label" },
      { key: "about.stats.1.value", label: "Stat 2 Value" },
      { key: "about.stats.1.label", label: "Stat 2 Label" },
      { key: "about.stats.2.value", label: "Stat 3 Value" },
      { key: "about.stats.2.label", label: "Stat 3 Label" },
    ],
  },
  {
    section: "About - Sectors",
    items: [
      { key: "about.sectorsList.0", label: "Sector 1" },
      { key: "about.sectorsList.1", label: "Sector 2" },
      { key: "about.sectorsList.2", label: "Sector 3" },
      { key: "about.sectorsList.3", label: "Sector 4" },
      { key: "about.sectorsList.4", label: "Sector 5" },
      { key: "about.sectorsList.5", label: "Sector 6" },
    ],
  },
  {
    section: "About - Values",
    items: [
      { key: "about.valuesList.0.title", label: "Value 1 Title" },
      { key: "about.valuesList.0.desc", label: "Value 1 Description", multiline: true },
      { key: "about.valuesList.1.title", label: "Value 2 Title" },
      { key: "about.valuesList.1.desc", label: "Value 2 Description", multiline: true },
      { key: "about.valuesList.2.title", label: "Value 3 Title" },
      { key: "about.valuesList.2.desc", label: "Value 3 Description", multiline: true },
      { key: "about.valuesList.3.title", label: "Value 4 Title" },
      { key: "about.valuesList.3.desc", label: "Value 4 Description", multiline: true },
      { key: "about.valuesList.4.title", label: "Value 5 Title" },
      { key: "about.valuesList.4.desc", label: "Value 5 Description", multiline: true },
    ],
  },
  {
    section: "Products Page",
    items: [
      { key: "products.title", label: "Title" },
      { key: "products.subtitle", label: "Subtitle" },
      { key: "products.intro", label: "Intro", multiline: true },
      { key: "products.fabricTitle", label: "Fabric Section Title" },
      { key: "products.fabricDesc", label: "Fabric Section Description", multiline: true },
      { key: "products.fabricItems.0.title", label: "Fabric Item 1 Title" },
      { key: "products.fabricItems.0.desc", label: "Fabric Item 1 Description", multiline: true },
      { key: "products.fabricItems.1.title", label: "Fabric Item 2 Title" },
      { key: "products.fabricItems.1.desc", label: "Fabric Item 2 Description", multiline: true },
      { key: "products.fabricItems.2.title", label: "Fabric Item 3 Title" },
      { key: "products.fabricItems.2.desc", label: "Fabric Item 3 Description", multiline: true },
    ],
  },
  {
    section: "Why Choose Us",
    items: [
      { key: "whyUs.title", label: "Title" },
      { key: "whyUs.reasons.0.title", label: "Reason 1 Title" },
      { key: "whyUs.reasons.0.desc", label: "Reason 1 Description", multiline: true },
      { key: "whyUs.reasons.1.title", label: "Reason 2 Title" },
      { key: "whyUs.reasons.1.desc", label: "Reason 2 Description", multiline: true },
      { key: "whyUs.reasons.2.title", label: "Reason 3 Title" },
      { key: "whyUs.reasons.2.desc", label: "Reason 3 Description", multiline: true },
      { key: "whyUs.reasons.3.title", label: "Reason 4 Title" },
      { key: "whyUs.reasons.3.desc", label: "Reason 4 Description", multiline: true },
      { key: "whyUs.reasons.4.title", label: "Reason 5 Title" },
      { key: "whyUs.reasons.4.desc", label: "Reason 5 Description", multiline: true },
      { key: "whyUs.reasons.5.title", label: "Reason 6 Title" },
      { key: "whyUs.reasons.5.desc", label: "Reason 6 Description", multiline: true },
    ],
  },
  {
    section: "Clients",
    items: [
      { key: "clients.title", label: "Title" },
      { key: "clients.sectors.0", label: "Client Sector 1" },
      { key: "clients.sectors.1", label: "Client Sector 2" },
      { key: "clients.sectors.2", label: "Client Sector 3" },
      { key: "clients.sectors.3", label: "Client Sector 4" },
      { key: "clients.sectors.4", label: "Client Sector 5" },
      { key: "clients.sectors.5", label: "Client Sector 6" },
    ],
  },
  {
    section: "Contact Page",
    items: [
      { key: "contact.title", label: "Title" },
      { key: "contact.subtitle", label: "Subtitle" },
      { key: "contact.form.name", label: "Form - Name" },
      { key: "contact.form.company", label: "Form - Company" },
      { key: "contact.form.email", label: "Form - Email" },
      { key: "contact.form.phone", label: "Form - Phone" },
      { key: "contact.form.sector", label: "Form - Sector" },
      { key: "contact.form.sectorPlaceholder", label: "Form - Sector Placeholder" },
      { key: "contact.form.quantity", label: "Form - Quantity" },
      { key: "contact.form.quantityPlaceholder", label: "Form - Quantity Placeholder" },
      { key: "contact.form.message", label: "Form - Message" },
      { key: "contact.form.submit", label: "Form - Submit Button" },
      { key: "contact.form.successTitle", label: "Success Toast Title" },
      { key: "contact.form.successDesc", label: "Success Toast Description", multiline: true },
      { key: "contact.processTitle", label: "Process Title" },
      { key: "contact.processDesc", label: "Process Description", multiline: true },
      { key: "contact.processSteps.0.num", label: "Process Step 1 Number" },
      { key: "contact.processSteps.0.title", label: "Process Step 1 Title" },
      { key: "contact.processSteps.0.desc", label: "Process Step 1 Description", multiline: true },
      { key: "contact.processSteps.1.num", label: "Process Step 2 Number" },
      { key: "contact.processSteps.1.title", label: "Process Step 2 Title" },
      { key: "contact.processSteps.1.desc", label: "Process Step 2 Description", multiline: true },
      { key: "contact.processSteps.2.num", label: "Process Step 3 Number" },
      { key: "contact.processSteps.2.title", label: "Process Step 3 Title" },
      { key: "contact.processSteps.2.desc", label: "Process Step 3 Description", multiline: true },
      { key: "contact.processSteps.3.num", label: "Process Step 4 Number" },
      { key: "contact.processSteps.3.title", label: "Process Step 4 Title" },
      { key: "contact.processSteps.3.desc", label: "Process Step 4 Description", multiline: true },
    ],
  },
  {
    section: "Footer",
    items: [
      { key: "footer.tagline", label: "Tagline" },
      { key: "footer.quickLinks", label: "Quick Links Label" },
      { key: "footer.rights", label: "Rights Text" },
    ],
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
          <p className="text-gray-500 mt-1">Edit the visible site texts in English and Arabic, organized by page section</p>
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
