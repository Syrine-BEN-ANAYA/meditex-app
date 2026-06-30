import { motion } from "framer-motion";
import { SiWhatsapp, SiInstagram } from "react-icons/si";
import { Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/context/LanguageContext";
import { content } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { language, dir } = useLanguage();
  const t = content[language].contact;
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: language === "en" ? "Message Sent" : "تم إرسال الرسالة",
      description: language === "en" ? "We will get back to you shortly." : "سنتواصل معك قريباً.",
    });
  };

  return (
    <section id="contact" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <motion.div
            initial={{ opacity: 0, x: dir === 'ltr' ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">
              {t.title}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {t.subtitle}
            </p>

            <div className="space-y-6 mb-12">
              <a href="https://wa.me/96891234567" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border shadow-sm hover:border-secondary hover:shadow-md transition-all group">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:text-secondary group-hover:bg-secondary/10 transition-colors">
                  <SiWhatsapp className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">WhatsApp</div>
                  <div className="text-muted-foreground" dir="ltr">+968 9123 4567</div>
                </div>
              </a>

              <a href="mailto:info@almajduniforms.com" className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border shadow-sm hover:border-secondary hover:shadow-md transition-all group">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:text-secondary group-hover:bg-secondary/10 transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Email</div>
                  <div className="text-muted-foreground">info@almajduniforms.com</div>
                </div>
              </a>

              <a href="https://instagram.com/almajduniforms" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border shadow-sm hover:border-secondary hover:shadow-md transition-all group">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:text-secondary group-hover:bg-secondary/10 transition-colors">
                  <SiInstagram className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Instagram</div>
                  <div className="text-muted-foreground">@almajduniforms</div>
                </div>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: dir === 'ltr' ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-background rounded-2xl p-8 border border-border shadow-lg"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">{t.form.name}</label>
                <Input required className="bg-muted/50" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t.form.company}</label>
                <Input required className="bg-muted/50" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t.form.message}</label>
                <Textarea required className="bg-muted/50 min-h-[150px]" />
              </div>
              <Button type="submit" size="lg" className="w-full text-lg">
                {t.form.submit}
                <Send className={`w-5 h-5 ${dir === 'ltr' ? 'ml-2' : 'mr-2'}`} />
              </Button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
