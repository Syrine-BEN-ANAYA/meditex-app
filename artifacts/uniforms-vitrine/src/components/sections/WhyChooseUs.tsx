import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { content } from "@/lib/data";

export default function WhyChooseUs() {
  const { language, dir } = useLanguage();
  const t = content[language].whyUs;

  return (
    <section id="why-us" className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t.title}
            </h2>
            <div className="w-20 h-1 bg-secondary mx-auto rounded-full" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex gap-4 bg-primary-foreground/5 p-6 rounded-2xl border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-colors"
            >
              <CheckCircle2 className="w-8 h-8 text-secondary shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2">{reason.title}</h3>
                <p className="text-primary-foreground/80 leading-relaxed">
                  {reason.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
