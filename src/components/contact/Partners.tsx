"use client";

import { ContactPageType } from "@/types/contact";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

type PartnersProps = {
  partners: ContactPageType["partners"];
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.5 } },
};

export default function Partners({ partners }: PartnersProps) {
  return (
    <section className="py-10 px-6 md:px-16 bg-[var(--background)] border-t border-theme">
      <motion.div
        className="w-full text-center mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <h4 className="text-sm text-[var(--foreground)]/80 mb-12 text-left">
          Trusted by
        </h4>

        {/* Responsive grid */}
        <div className="grid grid-cols-3 sm:grid-cols-3  gap-8 items-center justify-items-center w-full">
          {partners.map((p, i) => (
            <motion.div
              key={i}
              className="relative group w-36 h-16 flex items-center justify-center p-2 bg-white/10 backdrop-blur-sm rounded-lg shadow-lg opacity-90 cursor-pointer transition-transform hover:scale-105"
              variants={itemVariants}
            >
              <Image
                src={p.logoUrl && p.logoUrl.trim() !== "" ? p.logoUrl : "/Network.png"}
                alt={`partner-${p.name}`}
                width={60}
                height={64}
                className="object-contain block mx-auto"
              />

              {/* Tooltip on hover */}
              <span className="absolute bottom-10 left-1/2 -translate-x-1/2 -translate-y-6 text-xs bg-black/70 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                {p.name}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
