import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { content } from "@/lib/data";
import heroImg from "@/assets/hero.png";

export default function Hero() {
  const { language, dir } = useLanguage();
  const t = content[language].hero;

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Al Majd Uniforms"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/80 to-primary/40" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 pt-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Bilingual Title Display */}
            <div className="space-y-2 mb-6">
              <h2 className="text-secondary text-xl md:text-2xl font-medium tracking-widest uppercase">
                {language === "en" ? t.subtitle : content.en.hero.subtitle}
              </h2>
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                {language === "ar" ? content.ar.hero.title : content.en.hero.title}
              </h1>
              {language === "en" && (
                <h2 className="text-3xl md:text-5xl font-bold text-white/80 font-arabic" dir="rtl">
                  {content.ar.hero.title}
                </h2>
              )}
            </div>

            <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-10 max-w-2xl font-medium">
              {t.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-secondary text-primary hover:bg-secondary/90 text-lg px-8 py-6 h-auto group" asChild>
                <a href="#contact">
                  {t.cta}
                  {dir === "ltr" ? (
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  ) : (
                    <ArrowLeft className="mr-2 w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  )}
                </a>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10 hover:text-white text-lg px-8 py-6 h-auto" asChild>
                <a href="#products">
                  {content[language].nav.products}
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative Bottom Pattern */}
      <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
}
