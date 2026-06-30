import { Link } from "wouter";
import { SiWhatsapp, SiInstagram } from "react-icons/si";
import { Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { content } from "@/lib/data";
import logoImg from "@assets/WhatsApp_Image_2026-06-30_at_11.56.14_1782813402788.jpeg";

export default function Footer() {
  const { language } = useLanguage();
  const t = content[language].footer;

  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={logoImg} alt="Muscat Meditex" className="h-14 w-14 rounded-full object-cover ring-2 ring-secondary/40" />
              <div className="text-primary-foreground font-bold leading-tight">
                <div className="tracking-widest uppercase text-xs text-secondary">MUSCAT MEDITEX</div>
                <div className="font-arabic text-sm">مسقط ميديتكس</div>
              </div>
            </div>
            <p className="text-primary-foreground/70 max-w-xs">
              {t.tagline}
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">{t.quickLinks}</h4>
            <ul className="space-y-2">
              {Object.entries(content[language].nav).map(([key, label]) => (
                <li key={key}>
                  <a href={`#${key === 'whyUs' ? 'why-us' : key}`} className="text-primary-foreground/70 hover:text-secondary transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">{content[language].nav.contact}</h4>
            <div className="space-y-3">
              <a href="https://wa.me/96891234567" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-primary-foreground/70 hover:text-secondary transition-colors">
                <SiWhatsapp className="w-5 h-5" />
                <span dir="ltr">+968 9123 4567</span>
              </a>
              <a href="mailto:info@muscatmeditex.com" className="flex items-center gap-3 text-primary-foreground/70 hover:text-secondary transition-colors">
                <Mail className="w-5 h-5" />
                <span>info@muscatmeditex.com</span>
              </a>
              <a href="https://instagram.com/muscatmeditex" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-primary-foreground/70 hover:text-secondary transition-colors">
                <SiInstagram className="w-5 h-5" />
                <span>@muscatmeditex</span>
              </a>
              <div className="flex items-start gap-3 text-primary-foreground/70">
                <MapPin className="w-5 h-5 shrink-0 mt-1" />
                <span>Muscat, Sultanate of Oman</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-primary-foreground/50">
          <p>&copy; {new Date().getFullYear()} Muscat Meditex. {content.en.footer.rights}</p>
          <p className="font-arabic mt-2 md:mt-0">&copy; {new Date().getFullYear()} مسقط ميديتكس. {content.ar.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
