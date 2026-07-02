import { SiWhatsapp } from "react-icons/si";
import { useLanguage } from "@/context/LanguageContext";

export default function FloatingWhatsApp() {
  const { language } = useLanguage();

  const msg = language === "en" 
    ? "Hello Muscat Meditex, I would like to inquire about customized uniforms for my company."
    : "مرحباً مسقط ميديتكس، أود الاستفسار عن تفصيل زي موحد مخصص لشركتي.";

  const whatsappUrl = `https://wa.me/96891234567?text=${encodeURIComponent(msg)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Contact us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-2xl hover:bg-green-600 transition-all duration-300 hover:scale-110 active:scale-95 group ring-4 ring-white/10"
    >
      <SiWhatsapp className="w-7 h-7" />
      {/* Tooltip */}
      <span className="absolute right-16 scale-0 transition-all duration-200 group-hover:scale-100 bg-primary border border-secondary/20 text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-md">
        {language === "en" ? "Chat on WhatsApp" : "تواصل معنا عبر واتساب"}
      </span>
    </a>
  );
}
