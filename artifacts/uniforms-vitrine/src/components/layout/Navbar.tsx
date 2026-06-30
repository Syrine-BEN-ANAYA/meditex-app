import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { content } from "@/lib/data";
import logoImg from "@assets/WhatsApp_Image_2026-06-30_at_11.56.14_1782813402788.jpeg";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, dir } = useLanguage();
  const t = content[language].nav;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: t.about },
    { href: "#products", label: t.products },
    { href: "#why-us", label: t.whyUs },
    { href: "#clients", label: t.clients },
    { href: "#contact", label: t.contact },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/">
            <div className="cursor-pointer flex items-center gap-3">
              <img
                src={logoImg}
                alt="Muscat Meditex"
                className={`h-12 w-12 rounded-full object-cover transition-all ${isScrolled ? "ring-2 ring-primary/20" : "ring-2 ring-white/30"}`}
              />
              <div className={`text-base font-bold leading-tight transition-colors ${isScrolled ? "text-primary" : "text-white"}`}>
                <div className="tracking-widest uppercase text-xs">MUSCAT MEDITEX</div>
                <div className="font-arabic text-sm" dir="rtl">مسقط ميديتكس</div>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-secondary ${
                  isScrolled ? "text-foreground" : "text-white/90"
                }`}
              >
                {link.label}
              </a>
            ))}
            
            <Button
              variant={isScrolled ? "outline" : "secondary"}
              size="sm"
              onClick={toggleLanguage}
              className={`flex items-center gap-2 ${
                isScrolled 
                  ? "border-primary/20 text-primary hover:bg-primary/5" 
                  : "bg-white/10 border-white/20 text-white hover:bg-white/20"
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>{language === "en" ? "عربي" : "EN"}</span>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`md:hidden p-2 ${isScrolled ? "text-primary" : "text-white"}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-border shadow-lg p-4 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-foreground font-medium p-2 hover:bg-muted rounded-md"
            >
              {link.label}
            </a>
          ))}
          <Button
            variant="outline"
            className="w-full justify-center flex items-center gap-2"
            onClick={() => {
              toggleLanguage();
              setIsMobileMenuOpen(false);
            }}
          >
            <Globe className="w-4 h-4" />
            <span>{language === "en" ? "التبديل للعربية" : "Switch to English"}</span>
          </Button>
        </div>
      )}
    </nav>
  );
}
