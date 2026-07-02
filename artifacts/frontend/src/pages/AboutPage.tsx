import { motion } from "framer-motion";
import { Link } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Clients from "@/components/sections/Clients";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { content } from "@/lib/data";
import heroMeditex from "@/assets/hero-meditex.png";

import {
  CheckCircle2,
  Award,
  Scale,
  Lightbulb,
  Clock,
  Leaf,
  Compass,
  Target,
  Shield,
  Activity,
  Zap,
  GraduationCap,
  Building2,
  Briefcase,
  Wrench,
  Cog,
  FileCheck
} from "lucide-react";

import { useEffect, useState } from "react";

export default function AboutPage() {
  const { language, dir } = useLanguage();
  const t = content[language].about;

  // 🎬 ULTRA PRO MOUSE PARALLAX
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

  // Maps
  const valueIcons = [Award, Scale, Lightbulb, Clock, Leaf];

  const sectorIcons = [
    Activity,
    Zap,
    Shield,
    Wrench,
    Building2,
    GraduationCap
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-1">

        {/* 🔥 HERO ULTRA CINEMATIC */}
        <div className="relative min-h-[80vh] pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden text-white bg-background">

          {/* 🎥 IMAGE + PARALLAX */}
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
              src={heroMeditex}
              alt="Meditex Company Profile"
              className="w-full h-full object-cover scale-110"
            />
          </motion.div>

          {/* 🌑 CINEMATIC OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-background" />

          {/* ✨ GOLD GLOW FLOATING */}
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
            className="absolute top-[-260px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-secondary/20 blur-[170px] rounded-full"
          />

          {/* 🧭 LEFT GOLD LINE */}
          <div className="absolute left-0 top-0 h-full w-[2px] bg-secondary/70" />

          {/* 🌊 BOTTOM FADE */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

          {/* 📦 CONTENT */}
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.12 } }
              }}
              className="max-w-3xl space-y-6"
            >

              {/* SUBTITLE */}
              <motion.span
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.9 }}
                className="text-secondary font-bold tracking-[0.3em] text-xs uppercase"
              >
                {t.subtitle}
              </motion.span>

              {/* TITLE (REVEAL MASK STYLE) */}
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
                className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
              >
                {t.title}
              </motion.h1>

              {/* DESCRIPTION */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="max-w-2xl text-base md:text-lg text-white/80 leading-relaxed"
              >
                {t.description}
              </motion.p>

              {/* GOLD LINE */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 100 }}
                transition={{ duration: 1.3, delay: 0.4 }}
                className="h-[3px] bg-secondary rounded-full"
              />

              {/* MICRO TAGLINE */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex items-center gap-2 text-sm text-white/70"
              >
                <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                Engineering Identity • Industrial Excellence • GCC Leadership
              </motion.div>

            </motion.div>
          </div>
        </div>

        {/* SECTION 1 */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

              <motion.div className="lg:col-span-7 space-y-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-3xl font-bold text-primary">
                  {t.whoWeAreTitle}
                </h2>
                <p className="text-muted-foreground">{t.whoWeAreText1}</p>
                <p className="text-muted-foreground">{t.whoWeAreText2}</p>
              </motion.div>

              <motion.div className="lg:col-span-5 p-8 rounded-3xl bg-primary text-white"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <h3 className="text-secondary text-xl font-bold">
                  {t.facilityTitle}
                </h3>
                <p className="text-sm text-white/80 mt-4">
                  {t.facilityText}
                </p>
              </motion.div>

            </div>
          </div>
        </section>

        {/* SECTION 2 */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl grid md:grid-cols-2 gap-12">

            <motion.div className="p-8 bg-background rounded-2xl"
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -30 }}
            >
              <h3 className="text-primary font-bold text-2xl">{t.visionTitle}</h3>
              <p className="text-muted-foreground mt-4">{t.visionText}</p>
            </motion.div>

            <motion.div className="p-8 bg-background rounded-2xl"
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 30 }}
            >
              <h3 className="text-primary font-bold text-2xl">{t.missionTitle}</h3>
              <p className="text-muted-foreground mt-4">{t.missionText}</p>
            </motion.div>

          </div>
        </section>

        {/* CTA + REST RESTAURÉ */}
        <WhyChooseUs />
        <Clients />

      </main>

      <Footer />
    </div>
  );
}