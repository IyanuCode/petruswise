"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import ScrollingTestimonials from "./ScrollingTestimonials";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: "easeOut" },
  },
} as const;

const coreServices = [
  {
    icon: "/iconReg.png",
    title: "Regulatory Consulting",
    desc: "We guide businesses through national and international regulations, ensuring full compliance and smooth approvals.",
  },
  {
    icon: "/iconQual.png",
    title: "Quality Assurance",
    desc: "We design, implement, and audit quality systems that strengthen operations and elevate organizational excellence.",
  },
  {
    icon: "/iconBPI.png",
    title: "Complaints Management",
    desc: "We build efficient complaint-handling frameworks that turn customer feedback into actionable business intelligence.",
  },
  {
    icon: "/iconCap.png",
    title: "Human Capital Development",
    desc: "We empower teams with the skills and mindset needed to sustain quality, compliance, and continuous improvement.",
  },
  {
    icon: "/iconTraining.png",
    title: "Training & Development",
    desc: "We deliver customized training programs that enhance professional capacity and drive measurable organizational growth.",
  },
  {
    icon: "/iconTrain.png",
    title: "Business Process Improvement (BPI)",
    desc: "We analyze and refine internal processes to increase efficiency, reduce waste, and align strategies with business goals.",
  },
];

const features = [
  {
    letter: "A",
    title: "Speed",
    text: "Our deep local expertise ensures swift and efficient delivery.",
  },
  {
    letter: "B",
    title: "Value-Driven Solutions",
    text: "We focus on measurable results and long-term value for every client.",
  },
  {
    letter: "C",
    title: "Robust Network Connections",
    text: "We leverage partnerships across industries and regulators.",
  },
  {
    letter: "D",
    title: "Complete Service Package",
    text: "Everything you need, seamlessly integrated under one roof.",
  },
  {
    letter: "E",
    title: "Commitment to Excellence",
    text: "We’re relentless about precision, ethics, and quality results.",
  },
];

export default function MainBody() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <main>
      {/* -------------------- ABOUT PREVIEW -------------------- */}
      <ScrollReveal>
        <section className="relative py-24 mt-10 text-center bg-gradient-to-r from-[var(--brand-gold)]/10 to-transparent rounded-2xl overflow-hidden">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative z-10 max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[var(--heading)] dark:text-[var(--brand-gold)] drop-shadow-md">
              Who We Are
            </h2>
            <p className="text-lg leading-relaxed text-[var(--foreground)]/80">
              <span className="petruswise font-semibold]">PetrusWise</span> is a
              forward-thinking consulting and quality assurance firm helping
              organizations achieve excellence through compliance, strategy, and
              innovation. We deliver sustainable systems that work — driving
              measurable growth across Nigeria and beyond.
            </p>
          </motion.div>

          {/* Floating background gold wave for luxury effect */}
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(212,175,55,0.15)_0%,transparent_70%)]"
            style={{ y: yParallax }}
          />

          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            animate={{
              y: [0, -6, 0],
              opacity: [1, 0.8, 1],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute right-6 bottom-10 uppercase font-semibold 
             text-[var(--brand-black)]/60 tracking-[0.25em] 
             hidden md:inline select-none transition-all 
             hover:text-[var(--brand-gold)] hover:scale-105"
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              textShadow: "0 0 6px rgba(255, 215, 0, 0.35)", // soft glow
            }}
          >
            Leadership
          </motion.span>
        </section>
      </ScrollReveal>

      {/* -------------------- CORE SERVICES -------------------- */}
      <ScrollReveal>
        <section className="pb-24 px-6 md:px-16 text-center">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-4xl font-bold mb-12 text-[var(--heading)] dark:text-[var(--brand-gold)]"
          >
            Our Core Services
          </motion.h2>
          {/* The moving car and text */}
          <motion.div
            className="flex items-center justify-center gap-4 mx-auto mb-10"
            initial={{ x: -150, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, type: "spring", stiffness: 80 }}
          >
            <motion.div
              initial={{ x: -100 }}
              animate={{ x: 20 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              <Image
                src="/PetrusWisecar.png"
                alt="PetrusWiseCar Icon"
                width={60}
                height={60}
                className="drop-shadow-lg"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-lg md:text-xl italic font-medium text-[var(--foreground)] dark:text-gray-200"
            >
              “What sets us apart is our proactive engagement strategy.”
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {coreServices.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="p-8 rounded-2xl border border-theme shadow-md hover:shadow-xl bg-[var(--background)] transition-all duration-300"
              >
                <div className="mb-2 flex justify-center">
                  <Image src={s.icon} alt={s.icon} width={60} height={60} />
                </div>
                <h3 className="text-2xl font-semibold mb-2 text-[var(--heading)] dark:text-[var(--brand-gold)]">
                  {s.title}
                </h3>
                <p className="text-[var(--foreground)]/80 leading-relaxed">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
          {/* CTA */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-16"
          >
            <p className="text-[var(--foreground)]/80 mb-4 text-base md:text-lg">
              Still curious about our services and wish to know more?
            </p>
            <motion.button
              whileHover={{
                scale: 1.08,
                boxShadow: "0 0 25px rgba(212,175,55,0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              className="btn-gold text-base md:text-lg px-8 py-3 font-semibold"
            >
              <a href="/services"> Click Here</a>
            </motion.button>
          </motion.div>
        </section>
      </ScrollReveal>

      {/* -------------------- WHY CHOOSE US -------------------- */}
      <ScrollReveal>
        <section
          ref={ref}
          className="relative w-full min-h-screen grid grid-cols-1 md:grid-cols-2 overflow-hidden border-y-4 border-[var(--brand-gold)]"
        >
          {/* LEFT SIDE */}
          <div className="relative flex flex-col justify-center p-10 md:p-20 bg-[var(--brand-gold)] text-black overflow-hidden">
            <motion.div
              style={{ y: yParallax }}
              className="absolute inset-0 opacity-15"
            >
              <Image
                src="/hero2.jpg"
                alt="PetrusWise Vision"
                fill
                className="object-cover"
              />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-extrabold uppercase mb-6 leading-tight tracking-wide"
            >
              Why Choose Us?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="max-w-md text-lg md:text-xl leading-relaxed text-black/90"
            >
              At <span className="font-semibold">PetrusWise</span>, what makes
              us different is not just what we do — but how we do it.
            </motion.p>

            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              animate={{
                scale: [1, 1.05, 1],
                opacity: [1, 0.9, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.6,
              }}
              className="absolute left-6 bottom-10 uppercase font-semibold text-[var(--brand-black)]/60 tracking-[0.25em] hidden md:inline"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              dependable
            </motion.span>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative flex flex-col justify-center px-10 md:px-16 py-20 space-y-10 bg-[var(--background)] dark:bg-[var(--brand-background)] transition-colors">
            {features.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                whileHover={{ scale: 1.02 }}
                className="relative flex gap-6 items-start"
              >
                <motion.div
                  whileHover={{
                    scale: 1.15,
                    boxShadow: "0 0 15px rgba(212,175,55,0.6)",
                  }}
                  className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-[var(--brand-gold)] flex items-center justify-center font-bold text-[var(--brand-gold)] bg-gradient-to-br from-[#fff8e1] to-[#f7e6b1] dark:from-[#1a1508] dark:to-[#2a220c]"
                >
                  {item.letter}
                </motion.div>
                <div>
                  <h3 className="font-semibold text-xl mb-1 text-[var(--heading)]">
                    {item.title}
                  </h3>
                  <p className="text-[var(--foreground)]/70 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ---------------------ScrollingTestimonial ---------------- */}
      <ScrollingTestimonials />

      {/* -------------------- CTA -------------------- */}
      <ScrollReveal>
        <section className="py-24 px-6 md:px-16 bg-[var(--brand-gold)] text-white text-center">
          <motion.div
            variants={fadeUp}
            animate="visible"
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-4">
              Let’s Build Systems That Work.
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Partner with PetrusWise today — your trusted ally in achieving
              compliance, quality, and organizational excellence.
            </p>
            <Link
              href="/contact"
              className="px-8 py-3 bg-white text-[var(--brand-black)] font-semibold rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              Get in Touch
            </Link>
          </motion.div>
        </section>
      </ScrollReveal>
    </main>
  );
}
