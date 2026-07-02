import { motion } from "framer-motion";
import { Link } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Products from "@/components/sections/Products";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { content } from "@/lib/data";
import { Check, ShieldCheck, Compass, Settings2 } from "lucide-react";

export default function ProductsPage() {
  const { language, dir } = useLanguage();
  const t = content[language].products;

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-1">
        {/* HERO CLEAN + PREMIUM */}
        <div className="relative min-h-[58vh] pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden text-primary bg-gradient-to-br from-background via-background to-muted/30">

          {/* soft luxury glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(184,134,55,0.10),transparent_55%)]" />

          {/* gold accent line */}
          <div className="absolute left-0 top-0 h-full w-1 bg-secondary/60" />

          {/* bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background/80 to-transparent" />

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl space-y-5"
            >
              <span className="text-secondary font-bold tracking-widest text-xs md:text-sm uppercase block">
                {t.subtitle}
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                {t.title}
              </h1>

              <p className="max-w-2xl text-base md:text-lg leading-relaxed text-primary/80">
                {t.intro}
              </p>

              <div className="w-20 h-1 bg-secondary rounded-full" />
            </motion.div>
          </div>
        </div>

        {/* Portfolio Introduction Statement */}
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

        {/* Products Grid */}
        <Products />

        {/* Fabric & Quality Guide */}
        <section className="py-24 bg-background border-t border-border">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

              {/* TEXT */}
              <motion.div
                initial={{ opacity: 0, x: dir === "ltr" ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-6 space-y-6"
              >
                <h2 className="text-3xl font-bold text-primary">
                  {t.fabricTitle}
                </h2>

                <div className="w-12 h-1 bg-secondary rounded-full" />

                <p className="text-muted-foreground leading-relaxed">
                  {t.fabricDesc}
                </p>

                <div className="space-y-5 pt-2">
                  {t.fabricItems.map((item: any, idx: number) => (
                    <div key={idx} className="flex gap-4">
                      <div className="w-6 h-6 rounded-full bg-secondary/15 flex items-center justify-center text-secondary shrink-0 mt-0.5">
                        <Check className="w-4 h-4" />
                      </div>

                      <div>
                        <h4 className="font-bold text-primary mb-1">
                          {item.title}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* TECH CARDS */}
              <motion.div
                initial={{ opacity: 0, x: dir === "ltr" ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="lg:col-span-6 grid grid-cols-1 gap-6"
              >
                <div className="p-6 rounded-2xl bg-muted/40 border border-border/80 flex gap-4 hover:border-secondary/30 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                    <Settings2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">
                      {language === "en"
                        ? "Precision Digital Cutting"
                        : "القص الرقمي فائق الدقة"}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {language === "en"
                        ? "Zero variance manufacturing for perfect fit."
                        : "إنتاج دقيق بدون انحراف في القياسات."}
                    </p>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-muted/40 border border-border/80 flex gap-4 hover:border-secondary/30 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">
                      {language === "en"
                        ? "Oman Climate Engineering"
                        : "هندسة المناخ العُماني"}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {language === "en"
                        ? "Breathable fabrics for hot climates."
                        : "أقمشة خفيفة مناسبة للمناخ الحار."}
                    </p>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-muted/40 border border-border/80 flex gap-4 hover:border-secondary/30 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">
                      {language === "en"
                        ? "Certified Compliance"
                        : "امتثال معتمد"}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {language === "en"
                        ? "Safety & regulatory standards ensured."
                        : "مطابقة معايير السلامة والجودة."}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary text-primary-foreground text-center">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl space-y-6">
            <h2 className="text-3xl font-bold">
              {language === "en"
                ? "Looking for a Custom Uniform Program?"
                : "هل تبحث عن برنامج زي مخصص؟"}
            </h2>

            <div className="w-16 h-1 bg-secondary mx-auto rounded-full" />

            <p className="text-lg text-primary-foreground/90">
              {language === "en"
                ? "We design fully customized uniform solutions for your business."
                : "نصمم حلول زي موحد مخصصة بالكامل لاحتياجاتك."}
            </p>

            <Button
              size="lg"
              className="bg-secondary text-primary hover:bg-secondary/90 font-bold px-8 py-5 h-auto"
              asChild
            >
              <Link href="/contact">
                {language === "en"
                  ? "Consult Our Designers"
                  : "استشر مصممينا"}
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}