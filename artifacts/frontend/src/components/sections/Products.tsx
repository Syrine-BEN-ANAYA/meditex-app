import { Link } from "wouter";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { content } from "@/lib/data";

import corporateImg from "@/assets/corporate.png";
import healthcareImg from "@/assets/healthcare.png";
import hospitalityImg from "@/assets/hospitality.png";
import industrialImg from "@/assets/industrial.png";
import securityImg from "@/assets/security.png";
import schoolImg from "@/assets/school.png";

const images = {
  "corporate.png": corporateImg,
  "healthcare.png": healthcareImg,
  "hospitality.png": hospitalityImg,
  "industrial.png": industrialImg,
  "security.png": securityImg,
  "school.png": schoolImg,
};

export default function Products() {
  const { language } = useLanguage();
  const t = content[language].products;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-24 bg-muted/30">
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
            <p className="text-muted-foreground text-sm max-w-lg mx-auto mb-4">
              {t.subtitle}
            </p>
            <div className="w-20 h-1 bg-secondary mx-auto rounded-full" />
          </motion.div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {t.items.map((item) => (
            <Link key={item.id} href={`/collections/${item.id}`} className="block h-full">
              <motion.div 
                variants={itemVariants}
                className="group h-full rounded-2xl overflow-hidden bg-background border border-border shadow-sm hover:shadow-xl hover:border-secondary/40 transition-all cursor-pointer flex flex-col"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10" />
                  <img 
                    src={images[item.img as keyof typeof images]} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">
                    {item.desc}
                  </p>
                  <p className="text-sm font-bold text-secondary mt-auto">
                    {language === "en" ? "Explore Collection →" : "استكشف المجموعة ←"}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
