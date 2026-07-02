import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { SiWhatsapp, SiInstagram } from "react-icons/si";
import { Mail, Phone, MapPin, Send, HelpCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FindUs from "@/components/sections/FindUs";
import contactHero from "@/assets/contact-hero.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/context/LanguageContext";
import { content } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

export default function ContactPage() {
  const { language, dir } = useLanguage();
  const t = content[language].contact;
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    sector: "",
    quantity: "",
    message: "",
  });

  // Extract query parameters from URL to prefill interest
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const interest = params.get("interest");
    const action = params.get("action");
    
    let prefilledSector = "";
    let prefilledMessage = "";

    if (interest) {
      prefilledSector = interest;
      if (language === "en") {
        prefilledMessage = `Hi, I am interested in requesting a quote/samples for the ${interest} collection.`;
      } else {
        prefilledMessage = `مرحباً، أنا مهتم بطلب عرض سعر/عينات لمجموعة ${interest}.`;
      }
    } else if (action === "mockup") {
      if (language === "en") {
        prefilledMessage = "I would like to request free digital uniform mockups for our brand.";
      } else {
        prefilledMessage = "أود طلب نماذج وتصاميم رقمية مجانية للزي الموحد الخاص بمؤسستنا.";
      }
    } else if (action === "samples") {
      if (language === "en") {
        prefilledMessage = "I would like to request physical fabric samples for our company.";
      } else {
        prefilledMessage = "أود طلب الحصول على عينات أقمشة ملموسة لشركتنا.";
      }
    }

    setFormData((prev) => ({
      ...prev,
      sector: prefilledSector,
      message: prefilledMessage,
    }));
  }, [language]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate successful submission
    toast({
      title: t.form.successTitle,
      description: t.form.successDesc,
    });

    // Reset form
    setFormData({
      name: "",
      company: "",
      email: "",
      phone: "",
      sector: "",
      quantity: "",
      message: "",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sectors = [
    { value: "corporate", label: language === "en" ? "Corporate & Business" : "الشركات والأعمال" },
    { value: "healthcare", label: language === "en" ? "Healthcare & Medical" : "الرعاية الصحية والطبية" },
    { value: "hospitality", label: language === "en" ? "Hospitality & Hotels" : "الضيافة والفنادق" },
    { value: "industrial", label: language === "en" ? "Industrial & Flame-Resistant" : "الصناعة والسلامة" },
    { value: "security", label: language === "en" ? "Security & Safety Forces" : "الأمن وقوات السلامة" },
    { value: "school", label: language === "en" ? "School & Educational" : "الزي المدرسي والتعليمي" },
  ];

  const quantities = [
    { value: "10-50", label: language === "en" ? "10 - 50 pieces" : "١٠ - ٥٠ قطعة" },
    { value: "50-200", label: language === "en" ? "50 - 200 pieces" : "٥٠ - ٢٠٠ قطعة" },
    { value: "200-1000", label: language === "en" ? "200 - 1000 pieces" : "٢٠٠ - ١٠٠٠ قطعة" },
    { value: "1000+", label: language === "en" ? "1000+ pieces" : "أكثر من ١٠٠٠ قطعة" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      
      <main className="flex-1">
     {/* Page Hero */}
<div className="relative min-h-[65vh] overflow-hidden text-white">

  {/* Background Image */}
  <motion.img
    src={contactHero}
    alt="Contact Meditex"
    className="absolute inset-0 h-full w-full object-cover brightness-110 contrast-105 saturate-110"
    initial={{ scale: 1.05 }}
    animate={{ scale: 1 }}
    transition={{ duration: 2 }}
  />

  {/* Light Overlay */}
  <div className="absolute inset-0 bg-black/20" />

  {/* Elegant Left Gradient */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/15 to-transparent" />

  {/* Warm Golden Glow */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,215,120,0.22),transparent_60%)]" />

  {/* Soft Top Light */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5" />

  {/* Gold Accent */}
  <div className="absolute left-0 top-0 h-full w-1 bg-secondary" />

  {/* Bottom Fade */}
  <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-background via-background/70 to-transparent" />

  {/* Content */}
  <div className="container relative z-20 mx-auto flex min-h-[65vh] items-center px-4 md:px-6">

    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-3xl"
    >

      <span className="inline-block mb-5 text-secondary font-bold tracking-[0.35em] uppercase text-sm">
        {language === "en"
          ? "Premium Contact Experience"
          : "تجربة تواصل متميزة"}
      </span>

      <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] text-white drop-shadow-lg">
        {t.title}
      </h1>

      <p className="mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-white/95">
        {t.subtitle}
      </p>

      <div className="mt-8 w-24 h-1 rounded-full bg-secondary shadow-lg shadow-secondary/40" />

    </motion.div>

  </div>

</div>
        {/* Contact and Form Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto items-start">
              
              {/* Left Column: Direct Info & Slogan */}
              <motion.div
                initial={{ opacity: 0, x: dir === 'ltr' ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-primary">{language === "en" ? "Inquiry Office" : "مكتب الاستفسارات"}</h2>
                  <p className="text-lg text-muted-foreground">
                    {t.subtitle}
                  </p>
                </div>

                <div className="space-y-4">
                  <a href="https://wa.me/96891234567" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-5 rounded-2xl bg-muted/40 border border-border shadow-sm hover:border-secondary hover:shadow-md hover:bg-white transition-all group">
                    <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 group-hover:bg-green-500/20 transition-colors">
                      <SiWhatsapp className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-bold text-foreground">WhatsApp Chat</div>
                      <div className="text-muted-foreground text-sm" dir="ltr">+968 9123 4567</div>
                    </div>
                  </a>

                  <a href="tel:+96891234567" className="flex items-center gap-4 p-5 rounded-2xl bg-muted/40 border border-border shadow-sm hover:border-secondary hover:shadow-md hover:bg-white transition-all group">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-secondary/15 group-hover:text-secondary transition-colors">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-foreground">{language === "en" ? "Call Direct" : "الاتصال المباشر"}</div>
                      <div className="text-muted-foreground text-sm" dir="ltr">+968 9123 4567</div>
                    </div>
                  </a>

                  <a href="mailto:info@muscatmeditex.com" className="flex items-center gap-4 p-5 rounded-2xl bg-muted/40 border border-border shadow-sm hover:border-secondary hover:shadow-md hover:bg-white transition-all group">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-secondary/15 group-hover:text-secondary transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-foreground">Email Address</div>
                      <div className="text-muted-foreground text-sm">info@muscatmeditex.com</div>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-5 rounded-2xl bg-muted/40 border border-border shadow-sm">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-foreground">{language === "en" ? "Showroom Location" : "موقع المعرض"}</div>
                      <div className="text-muted-foreground text-sm">Al Misfah Industrial Area, Muscat, Oman</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Premium Inquiry Form */}
              <motion.div
                initial={{ opacity: 0, x: dir === 'ltr' ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-background rounded-2xl p-8 md:p-10 border-2 border-secondary/20 shadow-xl space-y-6"
              >
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-1">
                    {language === "en" ? "Request Quote & Samples" : "طلب عرض سعر وعينات"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {language === "en" 
                      ? "Submit your specifications to get a custom digital mock-up and fabric consultation."
                      : "أدخل مواصفاتك للحصول على تصميم افتراضي مجاني واستشارة حول الأقمشة المناسبة."}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-primary mb-1.5">{t.form.name}</label>
                      <Input name="name" required value={formData.name} onChange={handleInputChange} className="bg-muted/30 border-border focus-visible:ring-secondary" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-primary mb-1.5">{t.form.company}</label>
                      <Input name="company" required value={formData.company} onChange={handleInputChange} className="bg-muted/30 border-border focus-visible:ring-secondary" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-primary mb-1.5">{t.form.email}</label>
                      <Input name="email" type="email" required value={formData.email} onChange={handleInputChange} className="bg-muted/30 border-border focus-visible:ring-secondary" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-primary mb-1.5">{t.form.phone}</label>
                      <Input name="phone" required value={formData.phone} onChange={handleInputChange} className="bg-muted/30 border-border focus-visible:ring-secondary" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-primary mb-1.5">{t.form.sector}</label>
                      <select
                        name="sector"
                        required
                        value={formData.sector}
                        onChange={handleInputChange}
                        className="flex h-10 w-full rounded-md border border-border bg-muted/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-foreground"
                      >
                        <option value="" disabled>{t.form.sectorPlaceholder}</option>
                        {sectors.map((s) => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-primary mb-1.5">{t.form.quantity}</label>
                      <select
                        name="quantity"
                        required
                        value={formData.quantity}
                        onChange={handleInputChange}
                        className="flex h-10 w-full rounded-md border border-border bg-muted/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-foreground"
                      >
                        <option value="" disabled>{t.form.quantityPlaceholder}</option>
                        {quantities.map((q) => (
                          <option key={q.value} value={q.value}>{q.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary mb-1.5">{t.form.message}</label>
                    <Textarea name="message" required value={formData.message} onChange={handleInputChange} className="bg-muted/30 border-border min-h-[120px] focus-visible:ring-secondary" />
                  </div>

                  <Button type="submit" size="lg" className="w-full text-base font-bold bg-secondary text-primary hover:bg-secondary/90 shadow-md cursor-pointer">
                    {t.form.submit}
                    <Send className={`w-4 h-4 ${dir === 'ltr' ? 'ml-2' : 'mr-2'}`} />
                  </Button>
                </form>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Process Timeline Section (Soft conversion - lowers anxiety) */}
        <section className="py-24 bg-muted/30 border-y border-border">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl font-bold text-primary">{t.processTitle}</h2>
              <p className="text-muted-foreground text-sm max-w-xl mx-auto">
                {t.processDesc}
              </p>
              <div className="w-20 h-1 bg-secondary mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {t.processSteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-background rounded-2xl p-6 border border-border/80 shadow-sm relative flex flex-col"
                >
                  <div className="text-4xl font-extrabold text-secondary/35 absolute top-4 right-4 font-sans select-none">
                    {step.num}
                  </div>
                  <h4 className="text-lg font-bold text-primary mt-4 mb-2">{step.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Find Us Showroom Map Component */}
        <FindUs />
      </main>

      <Footer />
    </div>
  );
}
