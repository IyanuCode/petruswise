'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

//----------------------Props-------------------------
type ServiceHeroType = {
  heroImage:string;
}
export default function ServicesHero({heroImage}:ServiceHeroType) {
  return (
     <section className="relative h-[65vh] flex items-center justify-center overflow-hidden">
        <Image
          src={heroImage && heroImage.trim() !=="" ? heroImage : "/hero1.jpg"}
          alt="PetrusWise Services"
          fill
          priority
          className="object-cover brightness-[.6]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-[var(--brand-gold)] mb-4 uppercase tracking-wide">
            Our Services
          </h1>
          <p className="max-w-3xl mx-auto subheading text-base md:text-lg">
            We deliver tailored consulting solutions that help organizations
            grow with speed, quality, and value.
          </p>
        </motion.div>
      </section>
  )
}
