"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

// testimonial data
const testimonials = [
  {
    emoji: "💬",
    text: "PetrusWise helped us achieve ISO certification seamlessly — their professionalism is unmatched.",
    name: "Chioma E.",
    role: "Operations Manager",
    location: "Lagos",
    image: "/scrollOne.jpg",
  },
  {
    emoji: "✨",
    text: "Their consulting transformed our internal processes beautifully.",
    name: "Ibrahim S.",
    role: "Quality Supervisor",
    location: "Ondo",
    image: "/scrollTwo.png",
  },
  {
    emoji: "💃",
    text: "Training sessions were engaging, practical, and deeply impactful.",
    name: "Ngozi A.",
    role: "HR Lead",
    location: "Katsina",
    image: "/scrollTwo.jpg",
  },
  {
    emoji: "🚀",
    text: "Professional, efficient, and incredibly insightful — PetrusWise delivers excellence every time.",
    name: "Michael O.",
    role: "Consultant",
    location: "Ogbomoso",
    image: "/scrollThree.jpg",
  },
  {
    emoji: "🌟",
    text: "They made compliance simple and sustainable for our organization.",
    name: "Tosin D.",
    role: "Compliance Officer",
    location: "Ibadan",
    image: "/scrollEight.jpg",
  },
];

const testimonials2 = [
  {
    emoji: "💼",
    text: "Their attention to detail and commitment to client satisfaction is second to none.",
    name: "Ruth T.",
    role: "Business Strategist",
    location: "Abuja",
    image: "/5.jpg",
  },
  {
    emoji: "❤️",
    text: "We’ve worked with many consultants, but PetrusWise truly stands out — genuine partnership!",
    name: "Oluwaseun F.",
    role: "Project Coordinator",
    location: "Port Harcourt",
    image: "/scrollSeven.jpg",
  },
  {
    emoji: "🔥",
    text: "Dynamic, knowledgeable, and passionate — they bring energy and clarity to every session.",
    name: "Adewale G.",
    role: "Team Lead",
    location: "Ilorin",
    image: "/scrollFour.jpg",
  },
  {
    emoji: "🏆",
    text: "Thanks to PetrusWise, we reached our operational goals ahead of schedule — top-tier service.",
    name: "Fatima B.",
    role: "Process Engineer",
    location: "Kano",
    image: "/scrollSix.jpg",
  },
  {
    emoji: "💎",
    text: "Their guidance reshaped how our team approaches quality management — truly invaluable support.",
    name: "Emmanuel I.",
    role: "Production Supervisor",
    location: "Benin City",
    image: "/scrollFive.jpg",
  },
];

export default function ScrollingTestimonials() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <section className="relative py-24 bg-[var(--background)] transition-colors duration-700 overflow-hidden">
      {/* Decorative background tint */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-gold)]/10 via-transparent to-[var(--brand-gold)]/10 opacity-50" />

      <div className="relative max-w-6xl mx-auto px-6 md:px-12 text-center z-10">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-[var(--brand-gold)] mb-3"
        >
          What Our Clients Say
        </motion.h2>

        <p className="text-[var(--foreground)]/80 mb-10 max-w-2xl mx-auto">
          Hear from organizations that have experienced transformation through
          PetrusWise’s systems, standards, and strategy.
        </p>

        {/* --- First Scrolling Row --- */}
        <div className="relative flex overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              duration: 60,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...testimonials, ...testimonials].map((t, i) => (
              <motion.div
                key={`first-${i}`}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 4px 30px rgba(212,175,55,0.25)",
                }}
                className="min-w-[260px] md:min-w-[300px] flex-shrink-0 border border-[var(--border)] bg-[var(--background)] rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-500"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[var(--brand-gold)] mb-3">
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-2xl mb-2">{t.emoji}</div>
                  <p className="text-[var(--foreground)]/90 text-sm md:text-base leading-relaxed italic mb-3">
                    “{t.text}”
                  </p>
                  <div className="text-[var(--brand-gold)] font-semibold">
                    {t.name}
                  </div>
                  <div className="text-xs text-[var(--muted)]">
                    {t.role}, {t.location}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* --- Second Scrolling Row (reverse direction) --- */}
        <div className="relative flex overflow-hidden mt-10">
          <motion.div
            className="flex gap-6"
            animate={{ x: ["-100%", "0%"] }}
            transition={{
              duration: 65,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...testimonials2, ...testimonials2].map((t, i) => (
              <motion.div
                key={`second-${i}`}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 4px 30px rgba(212,175,55,0.25)",
                }}
                className="min-w-[260px] md:min-w-[300px] flex-shrink-0 border border-[var(--border)] bg-[var(--background)] rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-500"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[var(--brand-gold)] mb-3">
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-2xl mb-2">{t.emoji}</div>
                  <p className="text-[var(--foreground)]/90 text-sm md:text-base leading-relaxed italic mb-3">
                    “{t.text}”
                  </p>
                  <div className="text-[var(--brand-gold)] font-semibold">
                    {t.name}
                  </div>
                  <div className="text-xs text-[var(--muted)]">
                    {t.role}, {t.location}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Shimmer separator */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[2px] bg-gradient-to-r from-transparent via-[var(--brand-gold)] to-transparent opacity-70" />
    </section>
  );
}
