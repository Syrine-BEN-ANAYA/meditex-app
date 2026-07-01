import { motion } from "framer-motion";
import { MapPin, Clock, Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function FindUs() {
  const { language } = useLanguage();

  const info = {
    en: {
      title: "Find Us",
      subtitle: "Visit our showroom in Muscat",
      address: "Industrial Area, Al Misfah, Muscat",
      country: "Sultanate of Oman",
      hours: "Sun – Thu: 8:00 AM – 6:00 PM",
      phone: "+968 9123 4567",
      directions: "Get Directions",
    },
    ar: {
      title: "موقعنا",
      subtitle: "زوروا معرضنا في مسقط",
      address: "المنطقة الصناعية، المسفاة، مسقط",
      country: "سلطنة عُمان",
      hours: "الأحد – الخميس: ٨:٠٠ ص – ٦:٠٠ م",
      phone: "+968 9123 4567",
      directions: "الحصول على الاتجاهات",
    },
  };

  const t = info[language];

  return (
    <section id="find-us" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">{t.title}</h2>
          <p className="text-muted-foreground text-lg">{t.subtitle}</p>
          <div className="w-20 h-1 bg-secondary mx-auto rounded-full mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-5"
          >
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-muted/40 border border-border">
              <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-foreground mb-1">{language === "en" ? "Address" : "العنوان"}</div>
                <div className="text-muted-foreground text-sm leading-relaxed">
                  {t.address}<br />{t.country}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-2xl bg-muted/40 border border-border">
              <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-foreground mb-1">{language === "en" ? "Working Hours" : "ساعات العمل"}</div>
                <div className="text-muted-foreground text-sm">{t.hours}</div>
                <div className="text-xs text-secondary font-medium mt-1">{language === "en" ? "Friday & Saturday: Closed" : "الجمعة والسبت: مغلق"}</div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-2xl bg-muted/40 border border-border">
              <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-foreground mb-1">{language === "en" ? "Phone" : "الهاتف"}</div>
                <div className="text-muted-foreground text-sm" dir="ltr">{t.phone}</div>
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=Muscat+Industrial+Area+Oman"
              target="_blank"
              rel="noreferrer"
              className="mt-auto inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors rounded-xl px-6 py-4 font-semibold text-sm"
            >
              <MapPin className="w-4 h-4" />
              {t.directions}
            </a>
          </motion.div>

          {/* Fake Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-2 rounded-2xl overflow-hidden border border-border shadow-lg relative"
            style={{ minHeight: "400px" }}
          >
            {/* Map background */}
            <svg
              viewBox="0 0 800 450"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full absolute inset-0"
              style={{ background: "#e8f0e4" }}
            >
              {/* Background areas */}
              <rect width="800" height="450" fill="#e8ede4" />

              {/* Large park/open area */}
              <rect x="0" y="0" width="260" height="180" fill="#d4e6cc" rx="0" />
              <rect x="500" y="250" width="300" height="200" fill="#d4e6cc" />
              <rect x="320" y="0" width="200" height="120" fill="#dde8d8" />

              {/* Water feature */}
              <ellipse cx="680" cy="80" rx="100" ry="55" fill="#b8d4e8" opacity="0.6" />
              <text x="645" y="85" fontSize="9" fill="#5a8fa8" fontFamily="sans-serif">Muscat Bay</text>

              {/* Main highways - thick */}
              {/* Sultan Qaboos Highway (horizontal main) */}
              <rect x="0" y="200" width="800" height="18" fill="#f5f0e8" />
              <rect x="0" y="205" width="800" height="2" fill="#ddd" strokeDasharray="20,10" />
              <rect x="0" y="211" width="800" height="2" fill="#ddd" />
              <text x="60" y="196" fontSize="8" fill="#888" fontFamily="sans-serif" fontWeight="bold">Sultan Qaboos Highway</text>

              {/* Vertical main road */}
              <rect x="320" y="0" width="16" height="450" fill="#f5f0e8" />
              <rect x="325" y="0" width="2" height="450" fill="#ddd" strokeDasharray="20,10" />
              <text x="232" y="350" fontSize="8" fill="#888" fontFamily="sans-serif" fontWeight="bold" transform="rotate(-90,232,350)">Al Misfah Street</text>

              {/* Secondary roads */}
              <rect x="0" y="310" width="800" height="10" fill="#f0ece0" />
              <rect x="0" y="100" width="800" height="10" fill="#f0ece0" />
              <rect x="160" y="0" width="10" height="450" fill="#f0ece0" />
              <rect x="500" y="0" width="10" height="450" fill="#f0ece0" />
              <rect x="650" y="0" width="10" height="450" fill="#f0ece0" />

              {/* Small side roads */}
              <rect x="0" y="155" width="320" height="6" fill="#f5f2e8" />
              <rect x="336" y="155" width="464" height="6" fill="#f5f2e8" />
              <rect x="0" y="260" width="320" height="6" fill="#f5f2e8" />
              <rect x="336" y="260" width="464" height="6" fill="#f5f2e8" />
              <rect x="60" y="0" width="6" height="200" fill="#f5f2e8" />
              <rect x="220" y="218" width="6" height="232" fill="#f5f2e8" />
              <rect x="420" y="0" width="6" height="200" fill="#f5f2e8" />
              <rect x="420" y="218" width="6" height="232" fill="#f5f2e8" />
              <rect x="580" y="0" width="6" height="200" fill="#f5f2e8" />
              <rect x="580" y="218" width="6" height="232" fill="#f5f2e8" />
              <rect x="730" y="0" width="6" height="200" fill="#f5f2e8" />
              <rect x="730" y="218" width="6" height="232" fill="#f5f2e8" />

              {/* Buildings / blocks */}
              <rect x="20" y="120" width="55" height="30" fill="#cdd9c9" rx="2" />
              <rect x="85" y="115" width="65" height="35" fill="#c8d5c4" rx="2" />
              <rect x="20" y="230" width="40" height="25" fill="#cdd9c9" rx="2" />
              <rect x="70" y="225" width="80" height="30" fill="#c8d5c4" rx="2" />
              <rect x="20" y="330" width="130" height="40" fill="#c8d5c4" rx="2" />
              <rect x="20" y="380" width="60" height="30" fill="#cdd9c9" rx="2" />
              <rect x="90" y="375" width="60" height="35" fill="#c2cfbe" rx="2" />

              <rect x="340" y="20" width="70" height="40" fill="#cdd9c9" rx="2" />
              <rect x="420" y="15" width="70" height="35" fill="#c8d5c4" rx="2" />
              <rect x="340" y="230" width="70" height="25" fill="#cdd9c9" rx="2" />
              <rect x="340" y="325" width="140" height="45" fill="#c5d2c1" rx="2" />
              <rect x="340" y="380" width="80" height="35" fill="#cdd9c9" rx="2" />
              <rect x="430" y="375" width="60" height="40" fill="#c8d5c4" rx="2" />

              <rect x="520" y="20" width="120" height="70" fill="#c8d5c4" rx="2" />
              <rect x="660" y="15" width="80" height="75" fill="#cdd9c9" rx="2" />
              <rect x="520" y="230" width="120" height="50" fill="#c5d2c1" rx="2" />
              <rect x="660" y="225" width="80" height="55" fill="#cdd9c9" rx="2" />
              <rect x="520" y="325" width="80" height="40" fill="#c8d5c4" rx="2" />
              <rect x="610" y="320" width="90" height="45" fill="#cdd9c9" rx="2" />
              <rect x="710" y="325" width="70" height="55" fill="#c2cfbe" rx="2" />

              {/* Road labels */}
              <text x="505" y="107" fontSize="7.5" fill="#999" fontFamily="sans-serif">Industrial Area Rd</text>
              <text x="164" y="97" fontSize="7.5" fill="#999" fontFamily="sans-serif">Al Seeb Rd</text>
              <text x="655" y="215" fontSize="7.5" fill="#999" fontFamily="sans-serif">Muscat Expressway</text>

              {/* Location PIN */}
              {/* Outer pulse ring */}
              <circle cx="328" cy="209" r="28" fill="#1a5c3a" opacity="0.15">
                <animate attributeName="r" values="22;34;22" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.2;0;0.2" dur="2s" repeatCount="indefinite" />
              </circle>
              {/* Pin shadow */}
              <ellipse cx="328" cy="240" rx="12" ry="4" fill="#000" opacity="0.15" />
              {/* Pin body */}
              <path d="M328 168 C312 168 300 180 300 196 C300 218 328 242 328 242 C328 242 356 218 356 196 C356 180 344 168 328 168Z" fill="#1a5c3a" />
              {/* Pin inner circle */}
              <circle cx="328" cy="196" r="10" fill="white" />
              {/* Pin dot */}
              <circle cx="328" cy="196" r="5" fill="#1a5c3a" />

              {/* Label badge */}
              <rect x="265" y="148" width="126" height="26" rx="13" fill="white" filter="url(#shadow)" />
              <filter id="shadow">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
              </filter>
              <text x="328" y="165" fontSize="10" fill="#1a5c3a" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">Muscat Meditex</text>

              {/* Compass */}
              <g transform="translate(752, 30)">
                <circle cx="0" cy="0" r="20" fill="white" opacity="0.9" />
                <text x="0" y="-8" fontSize="9" fill="#333" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">N</text>
                <line x1="0" y1="-5" x2="0" y2="5" stroke="#1a5c3a" strokeWidth="1.5" />
                <line x1="-5" y1="0" x2="5" y2="0" stroke="#ccc" strokeWidth="1" />
                <polygon points="0,-14 -3,-4 3,-4" fill="#1a5c3a" />
                <polygon points="0,14 -3,4 3,4" fill="#ccc" />
              </g>

              {/* Scale */}
              <rect x="30" y="420" width="80" height="3" fill="#888" rx="1" />
              <rect x="30" y="418" width="2" height="7" fill="#888" />
              <rect x="110" y="418" width="2" height="7" fill="#888" />
              <text x="65" y="415" fontSize="7" fill="#888" fontFamily="sans-serif" textAnchor="middle">500 m</text>

              {/* Watermark text */}
              <text x="400" y="440" fontSize="7" fill="#aaa" fontFamily="sans-serif" textAnchor="middle">Muscat, Sultanate of Oman — For illustration purposes</text>
            </svg>

            {/* Map overlay controls (decorative) */}
            <div className="absolute top-4 right-4 flex flex-col gap-1">
              <button className="w-8 h-8 bg-white rounded shadow-md text-gray-600 font-bold text-lg flex items-center justify-center hover:bg-gray-50 border border-gray-200">+</button>
              <button className="w-8 h-8 bg-white rounded shadow-md text-gray-600 font-bold text-lg flex items-center justify-center hover:bg-gray-50 border border-gray-200">−</button>
            </div>

            {/* Bottom badge */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2 shadow border border-border">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <div className="text-xs">
                <div className="font-semibold text-foreground">Muscat Meditex</div>
                <div className="text-muted-foreground">Industrial Area, Al Misfah</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
