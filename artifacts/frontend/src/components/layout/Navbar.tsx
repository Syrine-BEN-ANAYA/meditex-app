import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { content } from "@/lib/data";
import Logo from "@/components/ui/Logo";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const [location] = useLocation();

  const t = content[language].nav;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t.home },
    { href: "/about", label: t.about },
    { href: "/products", label: t.products },
    { href: "/contact", label: t.contact },
  ];

  const isActive = (href: string) => location === href;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center">

      {/* GLASS NAV */}
      <motion.nav
        animate={{
          scale: isScrolled ? 0.96 : 1,
          y: isScrolled ? 10 : 18,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="mt-4"
      >
        <div className="relative">

          {/* BACKGROUND GLASS */}
          <div className="absolute inset-0 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/10 shadow-xl" />

          <div className="relative flex items-center gap-10 px-8 py-4">

            {/* LOGO */}
            <Link href="/">
              <div className="flex items-center select-none">
                <Logo className="h-10 md:h-12 text-secondary" showText={true} />
              </div>
            </Link>

            {/* LINKS */}
            <div className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => {
                const active = isActive(link.href);

                return (
                  <Link key={link.href} href={link.href}>
                    <motion.div
                      whileHover={{
                        y: -2,
                        scale: 1.07,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 18,
                      }}
                      className="relative px-4 py-2 cursor-pointer"
                    >
                      <span
                        className={`text-sm font-medium transition-colors duration-300 ${
                          active
                            ? "text-secondary"
                            : "text-white/80 hover:text-white"
                        }`}
                      >
                        {link.label}
                      </span>

                      {/* underline */}
                      <motion.div
                        className="absolute left-1/2 -translate-x-1/2 -bottom-1 h-[2px] rounded-full bg-secondary"
                        initial={{ width: 0, opacity: 0 }}
                        animate={{
                          width: active ? 20 : 0,
                          opacity: active ? 1 : 0,
                        }}
                        whileHover={{
                          width: 40,
                          opacity: 1,
                        }}
                        transition={{ duration: 0.25 }}
                      />
                    </motion.div>
                  </Link>
                );
              })}
            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-3">

              <Button
                onClick={toggleLanguage}
                className="rounded-full bg-white/10 border border-white/10 text-white hover:bg-white/20 transition"
              >
                <Globe className="w-4 h-4 mr-2" />
                {language === "en" ? "AR" : "EN"}
              </Button>

              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="md:hidden p-2 rounded-full bg-white/10 text-white"
              >
                {isMobileOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 w-[90%] max-w-sm"
          >
            <div className="bg-black/70 backdrop-blur-2xl border border-white/10 rounded-3xl p-5 space-y-3">

              {navLinks.map((link) => {
                const active = isActive(link.href);

                return (
                  <Link key={link.href} href={link.href}>
                    <div
                      onClick={() => setIsMobileOpen(false)}
                      className={`p-3 rounded-xl text-sm font-medium transition ${
                        active
                          ? "bg-secondary/20 text-secondary"
                          : "text-white/80"
                      }`}
                    >
                      {link.label}
                    </div>
                  </Link>
                );
              })}

              <Button
                onClick={() => {
                  toggleLanguage();
                  setIsMobileOpen(false);
                }}
                className="w-full bg-white/10 text-white border border-white/10"
              >
                {language === "en" ? "Switch AR" : "English"}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}