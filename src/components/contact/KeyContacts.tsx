"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ContactPageType } from "@/types/contact";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

// You can mix DB data with your constant images here
const keyImages = [
  "/ceo.jpg",
  "/olagoke.jpg",
  "/popoola.jpg",
];

type KeyContactsProps = {
  keyContacts: ContactPageType["keyContacts"];
  testimonials: ContactPageType["testimonials"];
};

export default function KeyContacts({ keyContacts, testimonials }: KeyContactsProps) {
  return (
    <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-[var(--brand-gold)]">
                Key Contacts
              </h3>
              <p className="text-[var(--foreground)]/80 text-sm mb-4">
                Reach a specific team member directly for faster response.
              </p>

              <div className="grid grid-cols-1 gap-4">
                {keyContacts.map((p, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-4 rounded-lg bg-[var(--foreground)]/5 border border-theme"
                  >
                    <div className="w-20 h-27 relative rounded-md overflow-hidden bg-black/5">
                      <Image
                        src={p.imageUrl && p.imageUrl.trim() !== "" ? p.imageUrl : keyImages[idx]}
                        alt={p.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-[var(--brand-gold)]">
                        {p.name}
                      </div>
                      <div className="text-xs text-[var(--foreground)]/80">
                        {p.role}
                      </div>
                      <div className="text-xs text-[var(--foreground)]/70 mt-1">
                        {p.contactInfo}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Testimonials */}
              {/* <div className="mt-6 p-4 rounded-lg bg-[var(--background)] border border-theme">
                <h4 className="text-sm font-semibold text-[var(--heading)] mb-3">
                  Amidst Many Testimony
                </h4>
                <div className="space-y-3">
                  {testimonials.map((t, i) => (
                    <blockquote
                      key={i}
                      className="text-sm italic text-[var(--foreground)]/80"
                    >
                      “{t.quote}”{" "}
                      <span className="block text-xs mt-1 text-[var(--foreground)]/60">
                        — {t.author}
                      </span>
                    </blockquote>
                  ))}
                </div>
              </div> */}
            </motion.div>
  );
}
