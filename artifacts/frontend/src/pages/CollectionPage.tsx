import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { content } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Existing section hero images
import corporateImg from "@/assets/corporate.png";
import healthcareImg from "@/assets/healthcare.png";
import hospitalityImg from "@/assets/hospitality.png";
import industrialImg from "@/assets/industrial.png";
import securityImg from "@/assets/security.png";
import schoolImg from "@/assets/school.png";

const coverImages: Record<string, string> = {
  corporate: corporateImg,
  healthcare: healthcareImg,
  hospitality: hospitalityImg,
  industrial: industrialImg,
  security: securityImg,
  school: schoolImg,
};

// Auto-import all dynamically generated product images
const productImages = import.meta.glob<{ default: string }>('../assets/*.png', { eager: true });

export default function CollectionPage() {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const c = content[language] as any;
  const collections = c.collections || {};
  const collection = collections[id!];

  if (!collection) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
        <h1 className="text-4xl font-bold mb-4">Collection Not Found</h1>
        <Link href="/products">
          <Button className="cursor-pointer">Return to Collections</Button>
        </Link>
      </div>
    );
  }

  const getProductImage = (filename: string) => {
    const key = `../assets/${filename}`;
    return productImages[key]?.default || "";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const handleRequestQuote = () => {
    // Redirect to contact page with pre-filled interest slug
    window.location.href = `/contact?interest=${id}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative min-h-[56vh] pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden text-primary-foreground">
          <img
            src={coverImages[id!]}
            alt={collection.title}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/82 via-black/54 to-black/18 z-10" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent z-10" />
          
          <div className="container mx-auto px-4 md:px-6 relative z-20">
            <Link href="/products" className="inline-block mb-8 text-primary-foreground/80 hover:text-white transition-colors">
              <span className="flex items-center gap-2 font-medium">
                {language === "en" ? "← All Collections" : "← جميع المجموعات"}
              </span>
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-sm">
                {collection.title}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl">
                {collection.subtitle}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="py-20 bg-muted/20">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {collection.items.map((item: any) => (
                <motion.div 
                  key={item.id}
                  variants={cardVariants}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-secondary/35 transition-all border border-border flex flex-col group"
                >
                  <div className="aspect-square relative overflow-hidden bg-muted">
                    {getProductImage(item.img) ? (
                      <img 
                        src={getProductImage(item.img)} 
                        alt={language === "en" ? item.title : item.titleAr}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-primary/5 gap-3">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary/40"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                        </div>
                        <span className="text-xs text-primary/40 font-medium tracking-wide uppercase">
                          {language === "en" ? "Available on request" : "متوفر عند الطلب"}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-primary mb-3">
                      {language === "en" ? item.title : item.titleAr}
                    </h3>
                    <p className="text-muted-foreground flex-1 mb-6 text-sm">
                      {language === "en" ? item.desc : item.descAr}
                    </p>
                    
                    <Button 
                      className="w-full mt-auto cursor-pointer"
                      variant="default"
                      onClick={handleRequestQuote}
                    >
                      {language === "en" ? "Request Quote" : "طلب عرض سعر"}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
