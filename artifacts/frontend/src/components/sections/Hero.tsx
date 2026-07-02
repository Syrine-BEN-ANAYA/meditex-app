import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { content } from "@/lib/data";
import heroImg from "@/assets/hero.png";
import Logo from "@/components/ui/Logo";

export default function Hero() {
  const { language, dir } = useLanguage();
  const t = content[language].hero;

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Muscat Meditex"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/45" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 pt-24">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Logo prominently displayed */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mb-8 flex items-center gap-5"
            >
              <Logo className="h-20 w-20 md:h-24 md:w-24 text-secondary" showText={false} light={false} />
              <div className="hidden md:block w-px h-16 bg-white/20" />
              <div className="hidden md:block">
                <div className="text-secondary text-xs tracking-[0.25em] uppercase font-bold mb-1">
                  {t.subtitle}
                </div>
                <div className="text-white/60 text-xs font-arabic" dir="rtl">
                  مصنع ميديتكس ش.م.م — سلطنة عُمان
                </div>
              </div>
            </motion.div>

            {/* Bilingual Title Display */}
            <div className="space-y-2 mb-6">
              <h2 className="text-secondary text-sm md:text-base font-semibold tracking-wider uppercase md:hidden">
                {t.subtitle}
              </h2>
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-wide">
                {language === "ar" ? content.ar.hero.title : content.en.hero.title}
              </h1>
              {language === "en" && (
                <h2 className="text-2xl md:text-3xl font-bold text-secondary font-arabic" dir="rtl">
                  {content.ar.hero.title}
                </h2>
              )}
            </div>

            <p className="text-base md:text-lg text-white/90 leading-relaxed mb-10 max-w-2xl font-medium">
              {t.description}
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <Button size="lg" className="bg-secondary text-primary hover:bg-secondary/90 text-base font-bold px-8 py-5 h-auto group cursor-pointer shadow-lg transition-all" asChild>
                <Link href="/contact">
                  <span>{t.cta}</span>
                  {dir === "ltr" ? (
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  ) : (
                    <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  )}
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10 hover:text-white text-base font-semibold px-8 py-5 h-auto cursor-pointer" asChild>
                <Link href="/products">
                  <span>{content[language].nav.products}</span>
                </Link>
              </Button>
            </div>
            
            <p className="text-xs text-white/65 mt-3 px-1 italic">
              {t.ctaSub}
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative Bottom Pattern */}
      <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
}
