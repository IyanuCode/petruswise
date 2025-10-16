"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const features = [
  {
    letter: "A",
    title: "Speed",
    text: "Our familiarity with the terrain enables us to act swiftly, ensuring timely solutions for our clients.",
  },
  {
    letter: "B",
    title: "Value-Driven Solutions",
    text: "We deliver real solutions that provide measurable returns on investment, ensuring value for our clients.",
  },
  {
    letter: "C",
    title: "Robust Network Connections",
    text: "We leverage connections across industries and regulatory bodies, benefiting our clients with comprehensive support.",
  },
  {
    letter: "D",
    title: "Complete Service Package",
    text: "All necessary services are provided under one umbrella, ensuring seamless support throughout the project.",
  },
  {
    letter: "E",
    title: "Commitment to Excellence",
    text: "Our dedication to client satisfaction and excellence sets us apart in the consulting landscape.",
  },
];

export default function BodyTwo() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Create smooth parallax movement for background
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen grid grid-cols-1 md:grid-cols-2 text-amber-200 dark:text-gray-100 overflow-hidden"
    >
      {/* LEFT SIDE */}
      <div className="relative flex flex-col justify-center p-10 md:p-20 overflow-hidden bg-[var(--brand-gold)]">
        {/* Background Image with 3D parallax depth */}

        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src="/hero2.jpg"
            alt="Petruswise Vision"
            fill
            className="object-cover  opacity-10 "
          />
          {/* Gradient overlay for better contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-brand-gold/20 dark:from-black/70 dark:to-brand-gold/10" />
        </motion.div>

        {/* Headings */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold uppercase mb-6 leading-tight"
        >
          Why Choose Us?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-md text-lg md:text-xl leading-relaxed text-gray-200 md:text-gray-100"
        >
          At{" "}
          <span className="text-[var(--brand-gold,#C5A14E)] font-semibold">
            PETRUSWISE
          </span>
          , what makes us different is not just what we offer — but how we
          deliver.
        </motion.p>

        {/* Vertical Text */}
        <motion.span
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute left-6 bottom-10 uppercase font-semibold text-[var(--brand-gold,#C5A14E)] tracking-[0.25em]"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          dependable
        </motion.span>
      </div>

      {/* RIGHT SIDE */}
      <div className="relative flex flex-col justify-center px-10 md:px-16 py-20 space-y-10 overflow-hidden ">
        {/* Animated Shimmering Gold Curve */}
        {/* <motion.svg
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          viewBox="0 0 400 600"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-5 top-0 h-full w-auto opacity-60"
        >
          <motion.path
            d="M50 50 C300 150, 300 450, 50 550"
            stroke="url(#goldGradient)"
            strokeWidth="3"
            fill="transparent"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="goldGradient" x1="0" y1="0" x2="400" y2="600">
              <stop offset="0%" stopColor="#C5A14E">
                <animate
                  attributeName="stop-color"
                  values="#C5A14E;#E2C56C;#C5A14E"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="100%" stopColor="#E2C56C" />
            </linearGradient>
          </defs>
        </motion.svg> */}

        {/* Feature List */}
        {features.map((item, i) => (
          <motion.div
            key={item.letter}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className="relative z-10 flex gap-5 items-start"
          >
            <motion.div
              whileHover={{
                scale: 1.2,
                boxShadow: "0 0 15px rgba(197,161,78,0.8)",
              }}
              className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-[var(--brand-gold,#C5A14E)] flex items-center justify-center font-bold text-[var(--brand-gold,#C5A14E)] bg-gradient-to-br from-[#fff8e1] to-[#f7e6b1] dark:from-[#2a220c] dark:to-[#1a1508]"
            >
              {item.letter}
            </motion.div>
            <div>
              <h3 className="font-semibold text-xl mb-1">
                {item.title}
              </h3>
              <p className="text-sm dark:text-gray-300 max-w-md leading-relaxed text-[var(--brand-gold,#C5A14E)]">
                {item.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
