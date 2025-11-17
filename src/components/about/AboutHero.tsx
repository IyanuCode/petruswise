"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
type AboutHeroProps = {
  heroTitle: string;
  heroParagraph: string;
  heroImage?: string;
};

export default function AboutHero({
  heroTitle,
  heroParagraph,
  heroImage,
}: AboutHeroProps) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const cardVariants = {
    hover: { y: -8, boxShadow: "0 12px 24px rgba(0,0,0,0.15)" },
  };
  const titleVariant = {
    hidden: { opacity: 0, y: 30 } as const,
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } } as const,
  };
  return (
    <section
      ref={heroRef}
      className="relative min-h-[56vh] md:min-h-[64vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <motion.div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          y: heroY,
          backgroundImage: `url('${heroImage && heroImage.trim() !== "" ? heroImage : "/hero3.jpg"}')`,

        }}
      />

      {/* Gradient overlay (darkens image slightly for contrast) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10" />

      {/* Content layer (above all overlays) */}
      <div className="relative z-20 container mx-auto px-6 md:px-12 text-center text-white">
        <motion.h1
          variants={titleVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-[var(--brand-gold)]"
        >
          {heroTitle}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="
    mt-6 text-base md:text-lg max-w-3xl mx-auto leading-relaxed
    text-[var(--foreground)] font-bold subheading
    
  "
        >
          {heroParagraph}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mt-8 flex gap-4 justify-center"
        >
          <Link
            href="/services"
            className="px-6 py-3 rounded-md bg-[var(--brand-gold)] text-black font-semibold hover:opacity-90 transition"
          >
            Explore Services
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 border border-[var(--brand-gold)] text-[var(--brand-gold)] rounded-md hover:bg-[var(--brand-gold)] hover:text-black transition"
          >
            Work With Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
