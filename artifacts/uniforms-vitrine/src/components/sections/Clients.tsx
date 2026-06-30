import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { content } from "@/lib/data";

export default function Clients() {
  const { language } = useLanguage();
  const t = content[language].clients;

  return (
    <section id="clients" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              {t.title}
            </h2>
            <div className="w-20 h-1 bg-secondary mx-auto rounded-full" />
          </motion.div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-8 max-w-4xl mx-auto">
          {t.sectors.map((sector, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="px-6 py-3 bg-muted/50 rounded-full border border-border/50 text-foreground font-medium"
            >
              {sector}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
