import { motion } from "framer-motion";
import { Link } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Products from "@/components/sections/Products";
import productHero from "@/assets/product-hero.png";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { content } from "@/lib/data";
import { Check, ShieldCheck, Compass, Settings2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const { language, dir } = useLanguage();
  const t = content[language].products;

  // 🎬 mouse parallax (same as About)
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-1">

       {/* ================= HERO CINEMATIC ================= */}
<div className="relative min-h-[70vh] overflow-hidden">

  {/* IMAGE + PARALLAX */}
  <motion.div
    style={{
      x: mouse.x * 25,
      y: mouse.y * 25,
    }}
    initial={{ scale: 1.25 }}
    animate={{ scale: 1 }}
    transition={{ duration: 1.6, ease: "easeOut" }}
    className="absolute inset-0"
  >
    <img
      src={productHero}
      alt="Professional Workwear"
      className="w-full h-full object-cover scale-110 
                 brightness-125 contrast-110 saturate-125"
    />

    {/* overlay principal (cinematic depth) */}
    <div className="absolute inset-0 bg-black/15" />

    {/* gradient haut → bas (profondeur lumière) */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/10" />

    {/* glow latéral subtil */}
    <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-transparent" />
  </motion.div>

  {/* CONTENT LAYER (si tu en as) */}
  <div className="relative z-10 flex items-end min-h-[70vh] p-10">
    <div className="max-w-xl text-white">
      <h1 className="text-4xl md:text-6xl font-bold leading-tight">
        Professional Workwear
      </h1>
      <p className="mt-4 text-white/80 text-lg">
        Durable. Modern. Built for performance.
      </p>
    </div>
  </div>


          {/* OVERLAY */}
         <div className="absolute inset-0 bg-[#07121f]/60" />

<div className="absolute inset-0 bg-gradient-to-r from-[#050b14]/85 via-[#071a2b]/40 to-transparent" />
          {/* GOLD GLOW */}
          <motion.div
            animate={{
              x: [0, 40, 0],
              y: [0, -50, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-[-250px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-amber-400/10 blur-[170px] rounded-full"
          />

          {/* SIDE LINE */}
          <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-amber-300/80 via-amber-400/40 to-transparent" />

          {/* BOTTOM FADE */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />

          {/* CONTENT */}
          <div className="container relative z-10 mx-auto flex min-h-[70vh] items-center px-4 md:px-6">

            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: {
                  transition: { staggerChildren: 0.12 },
                },
              }}
              className="max-w-3xl space-y-6"
            >

              {/* SUBTITLE */}
              <motion.span
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.9 }}
                className="text-secondary font-semibold tracking-[0.3em] uppercase text-sm"
              >
                {t.subtitle}
              </motion.span>

              {/* TITLE */}
              <motion.h1
                initial={{
                  opacity: 0,
                  y: 60,
                  clipPath: "inset(100% 0 0 0)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  clipPath: "inset(0% 0 0 0)",
                }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="text-white text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
              >
                {t.title}
              </motion.h1>

              {/* INTRO */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="max-w-2xl text-lg md:text-xl text-white/90 leading-relaxed"
              >
                {t.intro}
              </motion.p>

              {/* LINE */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 96 }}
                transition={{ duration: 1.3, delay: 0.4 }}
                className="h-1 bg-secondary rounded-full"
              />

            </motion.div>
          </div>
        </div>

        {/* ================= RESTE IDENTIQUE ================= */}

        <section className="py-16 bg-background border-b border-border">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <p className="text-lg md:text-xl text-primary font-semibold leading-relaxed">
                {t.intro}
              </p>

              <div className="p-6 rounded-2xl bg-muted/40 border border-border/50 text-muted-foreground italic text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
                &ldquo;
                {language === "en"
                  ? "At MEDITEX, our product portfolio reflects the full depth of our industrial capabilities. We do not produce generic uniforms — we engineer precision-driven garment programs tailored to the unique operational, safety, and identity requirements of each sector we serve."
                  : "في ميديتكس، تعكس محفظة منتجاتنا العمق الكامل لقدراتنا الصناعية. نحن لا ننتج زياً موحداً عاماً — بل نصمم برامج ملابس دقيقة ومخصصة للمتطلبات التشغيلية والسلامة والهوية الفريدة لكل قطاع نخدمه."}
                &rdquo;
              </div>
            </motion.div>
          </div>
        </section>

        <Products />

        <section className="py-24 bg-background border-t border-border">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

              <motion.div
                initial={{ opacity: 0, x: dir === "ltr" ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-6 space-y-6"
              >
                <h2 className="text-3xl font-bold text-primary">
                  {t.fabricTitle}
                </h2>

                <div className="w-12 h-1 bg-secondary rounded-full" />

                <p className="text-muted-foreground leading-relaxed">
                  {t.fabricDesc}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: dir === "ltr" ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-6 grid gap-6"
              >
                <div className="p-6 rounded-2xl bg-muted/40 border border-border/80">
                  <Settings2 className="w-5 h-5 text-primary" />
                </div>

                <div className="p-6 rounded-2xl bg-muted/40 border border-border/80">
                  <Compass className="w-5 h-5 text-primary" />
                </div>

                <div className="p-6 rounded-2xl bg-muted/40 border border-border/80">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}