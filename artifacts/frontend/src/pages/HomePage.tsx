import { Link } from "wouter";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Products from "@/components/sections/Products";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Clients from "@/components/sections/Clients";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

export default function HomePage() {
  const { language } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        {/* Main Hero */}
        <Hero />
        
        {/* About Section (with story link) */}
        <About />

        {/* Featured Collections Grid */}
        <Products />

        {/* Value Proposition & Trust Indicators */}
        <WhyChooseUs />

        {/* Trusted Sectors Cloud */}
        <Clients />

        {/* Soft Conversion Call-To-Action (Gold/Blue Banner) */}
        <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden border-t-2 border-secondary/20">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl -z-10" />

          <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                {language === "en" 
                  ? "Elevate Your Corporate Identity Today" 
                  : "ارتقِ بهوية مؤسستك المهنية اليوم"}
              </h2>
              <div className="w-20 h-1 bg-secondary mx-auto rounded-full" />
              
              <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed font-medium">
                {language === "en"
                  ? "Partner with Muscat's premier uniform manufacturer. We provide custom fabric consultations and digital style mock-ups entirely free of charge."
                  : "شريكك المثالي للزي الموحد الراقي في مسقط. نوفر استشارات مجانية حول الأقمشة وتصاميم رقمية بالكامل بدون أي رسوم."}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
                <Button size="lg" className="bg-secondary text-primary hover:bg-secondary/90 font-bold px-8 py-5 h-auto text-base shadow-xl cursor-pointer w-full sm:w-auto" asChild>
                  <Link href="/contact?action=mockup">
                    <span>{language === "en" ? "Get Free Digital Mockups" : "احصل على تصاميم رقمية مجاناً"}</span>
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-bold px-8 py-5 h-auto text-base cursor-pointer w-full sm:w-auto" asChild>
                  <Link href="/contact?action=samples">
                    <span>{language === "en" ? "Request Fabric Samples" : "طلب عينات الأقمشة"}</span>
                  </Link>
                </Button>
              </div>
              <p className="text-xs text-primary-foreground/70">
                {language === "en"
                  ? "No commitments required. Custom sample tailored before bulk manufacturing starts."
                  : "بدون أي التزامات مسبقة. نقوم بتفصيل عينة تجريبية قبل بدء خط الإنتاج بالكامل."}
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
