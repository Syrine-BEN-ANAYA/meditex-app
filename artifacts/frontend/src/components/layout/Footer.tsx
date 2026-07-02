import { Link } from "wouter";
import { motion } from "framer-motion";
import { SiWhatsapp, SiInstagram } from "react-icons/si";
import { Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { content } from "@/lib/data";
import Logo from "@/components/ui/Logo";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export default function Footer() {
  const { language } = useLanguage();
  const t = content[language].footer;

  return (
    <footer className="relative overflow-hidden text-white">

      {/* BACKGROUND BLUE (premium gradient) */}
<div className="absolute inset-0 bg-gradient-to-b from-[#0A2A4A] via-[#071A33] to-[#050814]" />

      {/* GOLD + BLUE FLOATING GLOW */}
      <motion.div
        animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-10 w-80 h-80 bg-yellow-400/15 blur-[140px] rounded-full"
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 right-10 w-80 h-80 bg-blue-400/20 blur-[140px] rounded-full"
      />

      <div className="container mx-auto px-5 md:px-10 py-14 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-14">

          {/* BRAND */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show">
            <Logo className="h-12" showText={true} />

            <p className="text-[15px] md:text-base text-white/70 mt-4 leading-relaxed max-w-xs">
              {t.tagline}
            </p>

            <div className="mt-4 h-[2px] w-20 bg-gradient-to-r from-yellow-400/60 to-transparent rounded-full" />
          </motion.div>

          {/* LINKS */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-sm md:text-base tracking-[0.25em] uppercase text-yellow-400 font-semibold">
              {t.quickLinks}
            </h4>

            <ul className="mt-5 space-y-4 text-[16px] md:text-[17px]">

              {[
                { href: "/", label: content[language].nav.home },
                { href: "/about", label: content[language].nav.about },
                { href: "/products", label: content[language].nav.products },
                { href: "/contact", label: content[language].nav.contact },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="
                      relative cursor-pointer transition-all duration-300
                      text-white/70 hover:text-yellow-300
                      hover:translate-x-2 inline-block
                      text-[16px] md:text-[17px]
                    ">
                      {link.label}

                      {/* underline gold animation */}
                      <span className="
                        absolute left-0 -bottom-1 h-[1px] w-0
                        bg-yellow-400 transition-all duration-300
                        group-hover:w-full
                      " />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CONTACT */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-sm md:text-base tracking-[0.25em] uppercase text-yellow-400 font-semibold">
              {content[language].nav.contact}
            </h4>

            <div className="mt-5 space-y-4 text-[16px] md:text-[17px]">

              {[
                { icon: SiWhatsapp, text: "+968 9123 4567", color: "text-green-400" },
                { icon: Phone, text: "+968 9123 4567" },
                { icon: Mail, text: "info@muscatmeditex.com" },
                { icon: SiInstagram, text: "@muscatmeditex" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{
                    x: 10,
                    scale: 1.03,
                  }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="
                    flex items-center gap-3
                    text-white/70 hover:text-yellow-300
                    cursor-pointer transition-all
                  "
                >
                  <item.icon className={`w-5 h-5 ${item.color || ""}`} />
                  <span>{item.text}</span>
                </motion.div>
              ))}

              <div className="flex items-start gap-3 text-white/60 text-[15px] md:text-[16px] mt-2">
                <MapPin className="w-4 h-4 mt-1" />
                <span>Al Misfah Industrial Area, Muscat, Oman</span>
              </div>

            </div>
          </motion.div>

        </div>

        {/* DIVIDER */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          className="mt-10 h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent"
        />

        {/* BOTTOM */}
        <div className="pt-6 flex flex-col md:flex-row justify-between text-xs md:text-sm text-white/50">
          <p className="hover:text-yellow-300 transition">
            © {new Date().getFullYear()} Muscat Meditex
          </p>

          <p className="mt-2 md:mt-0 font-arabic hover:text-yellow-300 transition">
            © {new Date().getFullYear()} مسقط ميديتكس
          </p>
        </div>

      </div>
    </footer>
  );
}