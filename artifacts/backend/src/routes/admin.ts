import { Router } from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { db } from "@workspace/db";
import { siteContentTable, collectionsContentTable, productsContentTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { requireAdmin } from "../middlewares/auth.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.join(__dirname, "../../public/uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`);
  },
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

const router = Router();

router.post("/login", (req, res) => {
  const { password } = req.body as { password?: string };
  const adminPassword = process.env.ADMIN_PASSWORD || "admin1234";
  if (password === adminPassword) {
    (req as any).session.adminAuthenticated = true;
    res.json({ ok: true });
  } else {
    res.status(401).json({ error: "Mot de passe incorrect" });
  }
});

router.post("/logout", (req, res) => {
  (req as any).session.destroy(() => res.json({ ok: true }));
});

router.get("/session", (req, res) => {
  const authenticated = !!(req as any).session?.adminAuthenticated;
  res.json({ authenticated });
});

router.get("/content", requireAdmin, async (_req, res) => {
  const rows = await db.select().from(siteContentTable);
  res.json(rows);
});

router.put("/content", requireAdmin, async (req, res) => {
  const items = req.body as Array<{ key: string; valueEn: string; valueAr: string }>;
  if (!Array.isArray(items)) return res.status(400).json({ error: "Expected array" });
  for (const item of items) {
    await db
      .insert(siteContentTable)
      .values({ key: item.key, valueEn: item.valueEn, valueAr: item.valueAr })
      .onConflictDoUpdate({
        target: siteContentTable.key,
        set: { valueEn: item.valueEn, valueAr: item.valueAr, updatedAt: new Date() },
      });
  }
  res.json({ ok: true });
});

router.get("/collections", requireAdmin, async (_req, res) => {
  const collections = await db
    .select()
    .from(collectionsContentTable)
    .orderBy(collectionsContentTable.displayOrder);
  res.json(collections);
});

router.put("/collections/:id", requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { titleEn, titleAr, subtitleEn, subtitleAr, coverImage, displayOrder } = req.body as {
    titleEn?: string; titleAr?: string; subtitleEn?: string; subtitleAr?: string;
    coverImage?: string; displayOrder?: number;
  };
  await db
    .insert(collectionsContentTable)
    .values({ id, titleEn: titleEn ?? "", titleAr: titleAr ?? "", subtitleEn: subtitleEn ?? "", subtitleAr: subtitleAr ?? "", coverImage, displayOrder })
    .onConflictDoUpdate({
      target: collectionsContentTable.id,
      set: { titleEn, titleAr, subtitleEn, subtitleAr, coverImage, displayOrder, updatedAt: new Date() },
    });
  res.json({ ok: true });
});

router.get("/collections/:id/products", requireAdmin, async (req, res) => {
  const { id } = req.params;
  const products = await db
    .select()
    .from(productsContentTable)
    .where(eq(productsContentTable.collectionId, id))
    .orderBy(productsContentTable.displayOrder);
  res.json(products);
});

router.put("/products/:id", requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { collectionId, titleEn, titleAr, descEn, descAr, image, displayOrder } = req.body as {
    collectionId: string; titleEn?: string; titleAr?: string;
    descEn?: string; descAr?: string; image?: string; displayOrder?: number;
  };
  await db
    .insert(productsContentTable)
    .values({ id, collectionId, titleEn: titleEn ?? "", titleAr: titleAr ?? "", descEn: descEn ?? "", descAr: descAr ?? "", image, displayOrder })
    .onConflictDoUpdate({
      target: productsContentTable.id,
      set: { titleEn, titleAr, descEn, descAr, image, displayOrder, updatedAt: new Date() },
    });
  res.json({ ok: true });
});

router.post("/upload", requireAdmin, upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file" });
  const url = `/api/uploads/${req.file.filename}`;
  res.json({ url });
});

export default router;
