import React from "react";

interface LogoProps {
  className?: string;
  showText?: boolean;
  light?: boolean;
}

export default function Logo({ className = "h-12", showText = true, light = false }: LogoProps) {
  // SVG gold gradient IDs to keep unique
  const gradientId = light ? "gold-gradient-light" : "gold-gradient-dark";
  const glowFilterId = light ? "gold-glow-light" : "gold-glow-dark";

  return (
    <div className={`flex items-center gap-3 select-none group cursor-pointer ${className}`}>
      {/* Animated SVG Crest */}
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto aspect-square transition-all duration-500 group-hover:scale-105"
      >
        <defs>
          {/* Omani Metallic Gold Gradient */}
          <linearGradient id={gradientId} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#AA7C11" />
            <stop offset="30%" stopColor="#D4AF37" />
            <stop offset="50%" stopColor="#FFDF00" />
            <stop offset="70%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#AA7C11" />
          </linearGradient>

          {/* Subtle Golden Glow filter on Hover */}
          <filter id={glowFilterId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Wreath / Circle */}
        <g className="transition-transform duration-700 ease-out origin-center group-hover:rotate-6">
          {/* Stems */}
          <path
            d="M 65,160 C 35,130 35,70 65,40"
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="3.5"
            strokeLinecap="round"
            className="opacity-90"
          />
          <path
            d="M 135,160 C 165,130 165,70 135,40"
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="3.5"
            strokeLinecap="round"
            className="opacity-90"
          />

          {/* Laurel Leaves - Left Side */}
          {/* Leaves are styled to scale up on hover */}
          <g className="fill-current text-secondary transition-all">
            <path d="M 62,43 C 50,42 45,50 56,53 C 67,56 68,48 62,43 Z" fill={`url(#${gradientId})`} className="origin-center transition-transform duration-300 group-hover:scale-110" />
            <path d="M 52,65 C 40,62 33,68 44,73 C 55,78 58,70 52,65 Z" fill={`url(#${gradientId})`} className="origin-center transition-transform duration-300 group-hover:scale-110" />
            <path d="M 47,90 C 35,85 27,90 37,97 C 47,104 51,95 47,90 Z" fill={`url(#${gradientId})`} className="origin-center transition-transform duration-300 group-hover:scale-110" />
            <path d="M 49,115 C 37,110 29,117 38,123 C 47,129 52,120 49,115 Z" fill={`url(#${gradientId})`} className="origin-center transition-transform duration-300 group-hover:scale-110" />
            <path d="M 57,138 C 47,133 40,141 49,146 C 58,151 62,143 57,138 Z" fill={`url(#${gradientId})`} className="origin-center transition-transform duration-300 group-hover:scale-110" />
          </g>

          {/* Laurel Leaves - Right Side */}
          <g className="fill-current text-secondary transition-all">
            <path d="M 138,43 C 150,42 155,50 144,53 C 133,56 132,48 138,43 Z" fill={`url(#${gradientId})`} className="origin-center transition-transform duration-300 group-hover:scale-110" />
            <path d="M 148,65 C 160,62 167,68 156,73 C 145,78 142,70 148,65 Z" fill={`url(#${gradientId})`} className="origin-center transition-transform duration-300 group-hover:scale-110" />
            <path d="M 153,90 C 165,85 173,90 163,97 C 153,104 149,95 153,90 Z" fill={`url(#${gradientId})`} className="origin-center transition-transform duration-300 group-hover:scale-110" />
            <path d="M 151,115 C 163,110 171,117 162,123 C 153,129 148,120 151,115 Z" fill={`url(#${gradientId})`} className="origin-center transition-transform duration-300 group-hover:scale-110" />
            <path d="M 143,138 C 153,133 160,141 151,146 C 142,151 138,143 143,138 Z" fill={`url(#${gradientId})`} className="origin-center transition-transform duration-300 group-hover:scale-110" />
          </g>
        </g>

        {/* Central Crown / Ribbon */}
        <path
          d="M 85,35 Q 100,22 115,35"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="3"
          strokeLinecap="round"
          className="opacity-75"
        />

        {/* Golden Central MT Monogram */}
        <g className="transition-all duration-300 origin-center group-hover:filter-[url(#gold-glow-dark)]">
          {/* M Letter (Elegant Serif) */}
          <text
            x="82"
            y="118"
            fontFamily="Georgia, serif"
            fontSize="64"
            fontWeight="bold"
            fill={`url(#${gradientId})`}
            textAnchor="middle"
            className="tracking-tight select-none"
          >
            M
          </text>
          
          {/* T Letter (Overlapping Serif) */}
          <text
            x="116"
            y="126"
            fontFamily="Georgia, serif"
            fontSize="54"
            fontWeight="500"
            fill={`url(#${gradientId})`}
            textAnchor="middle"
            className="opacity-95 select-none"
          >
            T
          </text>
        </g>

        {/* Elegant Bottom Divider */}
        <path
          d="M 70,165 L 130,165"
          stroke={`url(#${gradientId})`}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <polygon
          points="100,160 105,165 100,170 95,165"
          fill={`url(#${gradientId})`}
        />
      </svg>

      {/* Brand Text Branding */}
      {showText && (
        <div className="flex flex-col select-none">
          <span
            className={`font-bold tracking-[0.16em] text-sm uppercase transition-colors duration-300 ${
              light ? "text-primary" : "text-white"
            } group-hover:text-secondary`}
          >
            MUSCAT MEDITEX
          </span>
          <span
            className={`text-xs opacity-75 font-arabic ${
              light ? "text-primary/70" : "text-white/70"
            } group-hover:text-white`}
            dir="rtl"
          >
            مسقط ميديتكس
          </span>
        </div>
      )}
    </div>
  );
}
