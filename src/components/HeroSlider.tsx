"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

export default function HeroSlider() {
  const slides = [
    {
      title: "Every Great Organization Has a Wise Partner",
      subtitle:
        "We turn bottlenecks into bridges through insight, systems, and strategy.",
      image: "/hero1.jpg",
    },
    {
      title: "Systems. Standards. Success.",
      subtitle:
        "We build organizations that thrive through quality, compliance, and innovation.",
      image: "/hero2.jpg",
    },
    {
      title: "Transforming Ideas Into Impact",
      subtitle:
        "Driving Africa’s growth through wisdom, innovation, and strategic leadership.",
      image: "/hero3.jpg",
    },
    {
      title: "Elevating Excellence Through Partnership",
      subtitle:
        "Delivering sustainable value through trusted consulting expertise.",
      image: "/hero4.jpg",
    },
    {
      title: "Shaping the Future of Quality & Compliance",
      subtitle: "Empowering industries to grow through systems that work.",
      image: "/hero5.jpg",
    },
  ];

  return (
    <div className="relative w-full h-[90vh] overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        loop
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        className="w-full h-full"
      >
        {slides.map((s, idx) => (
          <SwiperSlide key={idx}>
            <div
              className="w-full h-full bg-cover bg-center relative"
              style={{
                backgroundImage: `url(${s.image})`,
              }}
            >
              {/* --- Layered Overlays --- */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent dark:from-black/80" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-gold)]/10 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-black/30 dark:bg-black/50" />

              {/* --- Text Content --- */}
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl md:text-6xl font-bold mb-6 font-century gold-gradient drop-shadow-lg leading-tight"
                >
                  {s.title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="max-w-2xl text-lg md:text-xl mb-10 leading-relaxed !text-amber-100"
                >
                  {s.subtitle}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-4 justify-center"
                >
                  <a
                    href="/services"
                    className="px-8 py-3 rounded-lg bg-[var(--brand-gold)] text-[var(--brand-black)] font-semibold 
                    tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    Our Services
                  </a>
                  <a
                    href="/contact"
                    className="px-8 py-3 rounded-lg border border-[var(--brand-gold)] !text-white
                    hover:bg-[var(--brand-gold)] hover:text-[var(--brand-black)] font-semibold 
                    tracking-wide transition-all duration-300 hover:-translate-y-1"
                  >
                    Contact Us
                  </a>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* --- Optional Subtle Overlay Glow --- */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/10 pointer-events-none" />
    </div>
  );
}
