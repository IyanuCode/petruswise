"use client";

import { motion, Variants } from "framer-motion";
import { SiLinkedin, SiX } from "react-icons/si";
import { FaGlobe } from "react-icons/fa";

import { useState } from "react";
import Link from "next/link";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
};

export default function QuickInquirySection() {
  const [quickSent, setQuickSent] = useState(false);

  const onQuickSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuickSent(true);
    setTimeout(() => setQuickSent(false), 2500);
  };

  return (
    <section
      className="
        relative
        py-16 px-6 md:px-16 
        bg-[var(--brand-gold)]/50
        text-[var(--background)] 
        border-t border-[var(--brand-gold)]
        transition-colors duration-300
        overflow-hidden
      "
    >
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-10 items-center"
      >
        {/*  Quick Inquiry Form */}
        <div
          className="
            lg:col-span-2 
            bg-[var(--foreground)]/5 
            dark:bg-[var(--foreground)]/10 
            p-8 rounded-2xl 
            border border-[var(--brand-gold)]/30 
            shadow-lg backdrop-blur-sm
            transition-colors duration-300
          "
        >
          <h4 className="text-2xl font-extrabold mb-2">
            Quick Inquiry
          </h4>
          <p className="text-sm mb-5 text-[var(--foreground)] dark:text-[var(--background)]/80">
            Short on time? Drop a quick note — we’ll get back to you shortly.
          </p>

          <form onSubmit={onQuickSubmit} className="grid sm:grid-cols-3 gap-4">
            <input
              name="qname"
              placeholder="Name"
              required
              className="
                p-3 rounded-md 
                bg-transparent 
                border border-[var(--brand-gold)]/50 
                text-[var(--background)] dark:text-[var(--foreground)]
                placeholder-[var(--background)]/70 dark:placeholder-[var(--foreground)]/70
                focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)]/70
                transition-colors duration-300
              "
            />
            <input
              name="qemail"
              placeholder="Email"
              required
              type="email"
              className="
                p-3 rounded-md 
                bg-transparent 
                border border-[var(--brand-gold)]/50 
                text-[var(--background)] dark:text-[var(--foreground)]
                placeholder-[var(--background)]/70 dark:placeholder-[var(--foreground)]/70
                focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)]/70
                transition-colors duration-300
              "
            />
            <button
              type="submit"
              className="
                btn-gold font-semibold hover:opacity-90 transition-all
              "
            >
              {quickSent ? "Sent ✓" : "Send"}
            </button>
          </form>
        </div>

        {/*  Socials + CTA */}
        <div className="text-center">
          <h4 className="text-lg font-bold text-[var(--brand-gold)] mb-3">
            Follow Us
          </h4>
          <div className="flex items-center justify-center gap-4 mb-6">
            <a
              href="#"
              aria-label="LinkedIn"
              className="p-2 rounded-full hover:bg-[var(--foreground)]/10 transition"
            >
              <SiLinkedin className="w-6 h-6 text-current" />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="p-2 rounded-full hover:bg-[var(--foreground)]/10 transition"
            >
              <SiX className="w-6 h-6 text-current" />
            </a>
            <a
              href="#"
              aria-label="Website"
              className="p-2 rounded-full hover:bg-[var(--foreground)]/10 transition"
            >
              <FaGlobe  className="w-6 h-6 text-current" />
            </a>
          </div>

          <h4 className="text-lg font-semibold mb-2">
            Ready to Transform?
          </h4>
          <p className="text-sm text-[var(--foreground)]/80 dark:text-[var(--background)]/80 mb-5 leading-relaxed">
            Partner with <span className="font-semibold petruswise">PetrusWise</span> for
            practical, standards-driven transformation and organizational
            excellence.
          </p>
          <Link
            href="/contact"
            className="
              inline-block btn-gold px-6 py-3 
              rounded-md font-semibold shadow-md 
              hover:shadow-lg hover:-translate-y-1 transition-all
            "
          >
            Contact Us
          </Link> 
        </div>
      </motion.div>

      {/*  Animated Vertical Word */}
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.8, 1, 0.8],
          textShadow: [
            "0 0 0px var(--brand-gold)",
            "0 0 8px var(--brand-gold)",
            "0 0 0px var(--brand-gold)",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.6,
        }}
        className="
          z-50 absolute left-6 bottom-10 uppercase 
          font-semibold text-[var(--brand-black)]/50 
          dark:text-[var(--brand-gold)]/40
          tracking-[0.25em] hidden md:inline select-none
        "
        style={{
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
        }}
      >
        Accessible
      </motion.span>
    </section>
  );
}
