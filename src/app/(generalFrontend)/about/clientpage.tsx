"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/* ---------------------------------------------------------
  Small ScrollReveal component (self-contained)
  Use this to wrap any block you want to animate in view
--------------------------------------------------------- */
function ScrollReveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const variants = {
    hidden: { opacity: 0, y: 40 } as const,
    show: { opacity: 1, y: 0, transition: { duration: 0.8, delay } } as const,
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.18 }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

/* --- small visual variants for reuse --- */
const titleVariant = {
  hidden: { opacity: 0, y: 30 } as const,
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } } as const,
};

const staffData = [
  {
    name: "Mr. Bisi Popoola",
    role: "Partner, HR & Organizational Effectiveness",
    experience: "15+ years experience",
    tooltip:
      "Expert in HR strategy, cultural transformation, and people management.",
    image: "/popoola.jpg",
    overlayText: "A Transformative Leader",
    bio: "Mr. Bisi Popoola is a seasoned HR professional with over 15 years across consulting, FMCG, and QSR sectors. He has led organizational transformation at Cadbury, PZ Cussons, Perfetti Van Melle, and UAC Foods, driving performance through people. He holds an MSc in HR & Industrial Relations and multiple global HR certifications including SHRM-SCP and GPHR. A strategic leader and talented instrumentalist, he is happily married with children.",
  },
  {
    name: "Mrs. Tayo Awotiku",
    role: "Partner, Legal Services",
    experience: "12+ years experience",
    tooltip: "Legal expert in corporate, labour, and compliance law.",
    image: "/awotiku.jpg",
    overlayText: "Counsel for Clarity & Compliance",
    bio: "Mrs. Tayo Awotiku is an accomplished legal practitioner with over 12 years of experience in corporate law, compliance, and arbitration. She has provided strategic legal counsel across industries, ensuring clarity and compliance in transactions and governance. A Master's degree holder in Public Law from the University of Ibadan, she is also a skilled writer and editor, valued for her articulate expression and integrity-driven approach.",
  },
  {
    name: "Engr. Piagbo Beabu Kiasira",
    role: "Senior Consultant, ISG Management Systems",
    experience: "400+ audits conducted",
    tooltip: "COREN-certified ISO consultant and PECB Lead Implementer.",
    image: "/kiasira.jpg",
    overlayText: "Driven by Quality",
    bio: "Engr. Piagbo Beabu Kiasira is a COREN-certified engineer and ISO systems consultant with extensive auditing experience across manufacturing, oil & gas, and telecom sectors. He is a Lead Auditor for ISO 9001, 14001, 45001, 22000, and 13485, as well as a PECB-certified Lead Implementer for ISO 37301. Holding a Master’s degree in Project Management (Distinction) from Teesside University, UK, he brings a results-driven commitment to quality and leadership.",
  },
  {
    name: "Mrs. Taiwo Olagoke",
    role: "Senior Consultant, QA & GHP",
    experience: "18+ years experience",
    tooltip: "Specialist in QA systems, audits, and process optimization.",
    image: "/olagoke.jpg",
    overlayText: "Quality in Action",
    bio: "Mrs. Taiwo Olagoke is a quality assurance professional with more than 18 years of manufacturing experience. She has developed and implemented comprehensive QA systems that improve product integrity, compliance, and sustainability. Her expertise in audits, production oversight, and continuous improvement drives operational excellence across organizations.",
  },
  {
    name: "Mr. Tayo Egbedeyi",
    role: "Senior Consultant, R&D and Regulatory",
    experience: "20+ years experience",
    tooltip: "Expert in ISO standards, GMP, and Six Sigma implementation.",
    image: "/egbedeyi.jpg",
    overlayText: "Known for Excellence",
    bio: "Mr. Tayo Egbedeyi brings nearly two decades of experience in laundry, personal care, and home care industries. He has successfully led ISO 9001, 14001, 45001, and 22716 (GMP) implementations and driven R&D and regulatory excellence. His application of Six Sigma and lean methodologies has improved compliance, operational efficiency, and customer satisfaction.",
  },
];

const coreValues = [
  {
    title: "Leadership",
    description:
      "We motivate our team and clients to aim high and achieve more, creating pathways for progress and excellence through guidance and support.",
    icon: "/Leader.png",
    alt: "Leadership Icon",
  },
  {
    title: "Integrity",
    description:
      "We act with honesty, fairness, and respect, ensuring that every action we take aligns with ethical principles.",
    icon: "/iconQual.png",
    alt: "Integrity Icon",
  },
  {
    title: "Mastery",
    description:
      "We blend our expertise with professionalism to deliver long-term, impactful relationships with our clients.",
    icon: "/IconCap.png",
    alt: "Mastery Icon",
  },
  {
    title: "Networking",
    description:
      "We are focused on connecting people with people, as well as connecting people with ideas and opportunities. Our focus is to make a meaningful difference.",
    icon: "/Network.png",
    alt: "Networking Icon",
  },
  {
    title: "Civility",
    description:
      "We foster mutual respect for individuals and demonstrate professionalism in all our interactions.",
    icon: "/IconReg.png",
    alt: "Civility Icon",
  },
];

const aboutData = [
  {
    id: "01",
    title: "Founding & Purpose ",
    text: (
      <>
        Founded to bridge the gap between regulation and operational reality,{" "}
        {<span className="petruswise">PetrusWise</span>} focuses on practical
        solutions for real organizations.
      </>
    ),
  },
  {
    id: "02",
    title: "Our Approach",
    text: `We combine technical expertise with stakeholder engagement — implementing systems that last and training people to sustain them.`,
  },
  {
    id: "03",
    title: "Impact So Far",
    text: `Successful certifications, improved operational KPIs, and resilient teams across multiple sectors.`,
  },
];

export default function AboutPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const cardVariants = {
    hover: { y: -8, boxShadow: "0 12px 24px rgba(0,0,0,0.15)" },
  };
  const [expanded, setExpanded] = useState(false);
  const [expandedStaff, setExpandedStaff] = useState<number | null>(null);

  return (
   
      <main className="bg-[var(--background)] text-[var(--foreground)] transition-colors duration-400">
        <TooltipProvider>
          {/* =============== HERO — storytelling intro  =============== */}
          <section
            ref={heroRef}
            className="relative min-h-[56vh] md:min-h-[64vh] flex items-center justify-center overflow-hidden"
          >
            {/* Background image */}
            <motion.div
              className="absolute inset-0 z-0 bg-cover bg-center"
              style={{
                y: heroY,
                backgroundImage: "url('/hero3.jpg')",
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
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-[var(--brand-gold)] [text-shadow:1px_1px_2px_white]"
              >
                About PetrusWise
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.15 }}
                className="
    mt-6 text-base md:text-lg max-w-3xl mx-auto leading-relaxed
    text-[var(--foreground)] font-bold
    [text-shadow:1px_1px_2px_white]
  "
              >
                PetrusWise partners with public and private institutions to
                design systems that deliver compliance, quality, and measurable
                growth.
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

          {/* =============== Our STORY =============== */}
          <section className="relative py-24 px-6 md:px-12 bg-[var(--background)] border-t border-[var(--brand-gold)]/20 overflow-hidden">
            {/* Decorative glow background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,215,0,0.06),transparent_70%)] pointer-events-none" />

            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 relative z-10">
              {/* LEFT — Narrative / Timeline */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <h3 className="text-3xl md:text-4xl font-extrabold text-[var(--brand-gold)] mb-6 tracking-wide uppercase">
                  Our Story
                </h3>

                <div className="text-[var(--foreground)]/85 leading-relaxed text-sm md:text-base space-y-5">
                  <div>
                    In a world where business challenges evolve faster than most
                    organizations can adapt, the need for transformation remains
                    indispensable.
                  </div>
                  <div>
                    At{" "}
                    <span className="font-semibold text-[var(--brand-gold)] petruswise">
                      PetrusWise Limited
                    </span>
                    , we redefine consulting in Africa by helping businesses
                    become agile, effective, and compliant. We believe that true
                    growth is achieved through adaptability, innovation, and
                    alignment with evolving industry standards.
                  </div>
                  <div>
                    Our experts provide tailored solutions—not a
                    one-size-fits-all model. We focus on understanding your
                    unique business landscape, crafting practical strategies
                    that deliver measurable results across ISO certifications,
                    regulatory compliance, HR management, and professional
                    training.
                  </div>
                </div>

                {/* Timeline / Milestones */}
                <div className="mt-10 pl-6 border-l-2 border-[var(--brand-gold)] space-y-6">
                  {aboutData.map((item) => (
                    <div
                      key={item.id}
                      className="relative pl-4 before:content-[''] before:absolute before:-left-[10px] before:top-2 before:w-3 before:h-3 before:rounded-full before:bg-[var(--brand-gold)]"
                    >
                      <h4 className="text-lg font-bold text-[var(--brand-gold)] mb-1">
                        {item.title}
                      </h4>
                      <div className="text-[var(--foreground)]/80 text-sm leading-relaxed">
                        {item.text}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* RIGHT — Mission, Vision, Core Values */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col gap-10"
              >
                {/* Mission / Vision Cards */}
                <div className="flex flex-wrap justify-center gap-8">
                  {/* Mission */}
                  <motion.div
                    className="relative bg-gradient-to-br from-[var(--brand-gold)] to-yellow-600 text-[var(--brand-black)] rounded-2xl p-8 w-[320px] md:w-[360px] shadow-lg hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all duration-500"
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 6,
                          ease: "linear",
                        }}
                        className="w-10 h-10 flex items-center justify-center bg-black/20 rounded-full"
                      >
                        <img
                          src="/missionIcon.png"
                          alt="Mission Icon"
                          width={26}
                          height={26}
                          className="object-contain"
                        />
                      </motion.div>
                      <h3 className="font-extrabold uppercase text-lg tracking-wide">
                        Our Mission
                      </h3>
                    </div>
                    <div className="text-sm leading-relaxed font-medium opacity-90">
                      We help organizations enhance safety, quality,
                      environmental performance, and productivity—contributing
                      to a better society and improved quality of life.
                    </div>
                  </motion.div>

                  {/* Vision */}
                  <motion.div
                    className="relative bg-black/90 text-[var(--brand-gold)] rounded-2xl p-8 w-[320px] md:w-[360px] shadow-lg hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] transition-all duration-500"
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <motion.div
                        animate={{ scaleY: [1, 0.1, 1] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          repeatDelay: 3,
                          ease: "easeInOut",
                        }}
                        className="origin-center"
                      >
                        <img
                          src="/eye.png"
                          alt="Vision Icon"
                          width={26}
                          height={26}
                          className="object-contain"
                        />
                      </motion.div>
                      <h3 className="font-extrabold uppercase text-lg tracking-wide">
                        Our Vision
                      </h3>
                    </div>
                    <div className="text-sm leading-relaxed font-medium">
                      To lead consultancy in management systems, regulatory
                      affairs, education, and quality assurance—delivering
                      innovative solutions that transform organizations and
                      improve lives across Africa.
                    </div>
                  </motion.div>
                </div>

                {/* Core Values */}
                <div className="p-8 rounded-2xl border border-[var(--brand-gold)]/40 bg-[var(--foreground)]/5 shadow-md">
                  <h4 className="text-[var(--brand-gold)] text-2xl font-extrabold uppercase mb-6 tracking-wide">
                    Our Core Values
                  </h4>
                  <div className="grid grid-cols-2 gap-6 text-sm text-[var(--foreground)]/85 leading-relaxed">
                    {coreValues.map((item) => (
                      <div key={item.alt} className="flex items-start gap-3">
                        <img
                          src={item.icon}
                          alt={item.alt}
                          className="w-7 h-7 object-contain mt-1"
                        />
                        <div>
                          <span className="font-bold text-[var(--brand-gold)]">
                            {item.title}:
                          </span>{" "}
                          {item.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* =============== CEO PROFILE — dedicated, rich, unique layout =============== */}
          <section className="relative py-24 px-6 md:px-12 bg-gradient-to-br from-black via-[var(--background)] to-black border-t border-[var(--brand-gold)]/40 overflow-hidden">
            {/* Decorative Glow */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_30%,rgba(255,215,0,0.05),transparent_60%)]"></div>

            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
              {/* LEFT — CEO Portrait */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative bg-[var(--foreground)]/5 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(255,215,0,0.15)]"
              >
                {/* Gold Border Frame */}
                <div className="absolute inset-0 border border-[var(--brand-gold)]/30 rounded-3xl pointer-events-none z-20" />

                {/* Full Image (no zoom) */}
                <div className="relative w-full h-[500px] md:h-[560px] overflow-hidden">
                  <Image
                    src="/ceo.jpg"
                    alt="Olanrewaju Oresanya"
                    fill
                    priority
                    className="object-contain transition-transform duration-1000 ease-out z-10"
                  />
                </div>

                {/* Gold Nameplate */}
                <div className="bg-[var(--brand-gold)] text-[var(--brand-black)] text-center py-6 px-4">
                  <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mb-1">
                    Olanrewaju Oresanya
                  </h3>
                  <p className="uppercase text-sm font-semibold tracking-widest">
                    Chief Executive Officer
                  </p>
                  <div className="w-12 h-[2px] bg-[var(--brand-black)] mx-auto my-3 opacity-70" />
                  <p className="text-sm italic opacity-90">
                    “An Architect of Quality Systems in Africa.”
                  </p>
                </div>
              </motion.div>

              {/* RIGHT — Bio Section */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-[var(--foreground)]/90 leading-relaxed"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--brand-gold)] mb-6 uppercase tracking-wide">
                  Meet Our CEO
                </h2>

                {/* Paragraph 1 */}
                <div className="mb-5">
                  <strong className="text-[var(--brand-gold)]">
                    Olanrewaju Oresanya
                  </strong>{" "}
                  is a seasoned Management Systems expert with over{" "}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="underline decoration-[var(--brand-gold)] cursor-help">
                        27 years
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      Over 27 years of industry experience across QHSE and
                      operations.
                    </TooltipContent>
                  </Tooltip>{" "}
                  of QHSE and operational experience spanning R&D, procurement,
                  manufacturing, distribution, and customer service.
                </div>

                {/* Paragraph 2 */}
                <div className="mb-5">
                  He holds an{" "}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="underline decoration-[var(--brand-gold)] cursor-help">
                        MBA
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      Master of Business Administration, Ekiti State University
                    </TooltipContent>
                  </Tooltip>{" "}
                  and an{" "}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="underline decoration-[var(--brand-gold)] cursor-help">
                        HND in Analytical Chemistry
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      Higher National Diploma, Yaba College of Technology
                    </TooltipContent>
                  </Tooltip>
                  . He is a Fellow of the Institute of Chartered Chemists of
                  Nigeria, a member of the Management Systems Practitioners of
                  Nigeria (MASPN), and a certified Lead Auditor for ISO
                  9001:2015 and FSSC 22000.
                </div>

                {/* Expandable Extra Content */}
                {expanded && (
                  <div className="space-y-5 text-[var(--foreground)]/80">
                    <div>
                      Mr. Oresanya began his career at Procter & Gamble Nigeria
                      as a Quality Analyst, later becoming the Quality Control
                      Leader of the Ibadan Plant. In 2013, he joined PZ Cussons
                      Nigeria PLC as Quality Assurance Manager, rising to Africa
                      Quality Systems Manager and ISO 9001:2015 Representative.
                    </div>

                    <div>
                      He has been instrumental in achieving ISO certifications
                      and building sustainable quality infrastructures across
                      operations in Africa. He currently serves as Head of
                      Quality and Quality Systems Manager for Africa at PZ
                      Cussons.
                    </div>

                    <div>
                      At{" "}
                      <span className="font-semibold text-[var(--brand-gold)]">
                        PetrusWise Limited
                      </span>
                      , Mr. Oresanya leads with integrity, regulatory insight,
                      and a performance-driven vision—ensuring every client
                      engagement translates into measurable impact and
                      compliance excellence.
                    </div>
                  </div>
                )}

                {/* Read More Button */}
                <div className="mt-8">
                  <button
                    onClick={() => setExpanded(!expanded)}
                    className="btn-gold px-6 py-2.5 rounded-md text-sm font-semibold tracking-wide hover:shadow-[0_0_10px_var(--brand-gold)] transition-all duration-300"
                  >
                    {expanded ? "Read Less ▲" : "Read More ▼"}
                  </button>
                </div>
              </motion.div>
            </div>
          </section>

          {/* =============== STAFF SECTION — dynamic, mapped & animated =============== */}
          <section className="py-16 px-6 md:px-12 bg-[var(--background)] border-t border-theme">
            <div className="max-w-7xl mx-auto text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold gold uppercase mb-3">
                Meet Our Team
              </h2>
              <p className="text-[var(--foreground)]/70 max-w-2xl mx-auto text-sm">
                Our professionals bring diverse expertise in quality systems,
                safety, and regulatory management — ensuring excellence at every
                step.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {staffData.map((staff, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="group bg-[var(--foreground)]/5 rounded-xl shadow-md overflow-hidden flex flex-col items-center text-center hover:shadow-[0_0_15px_var(--brand-gold)] transition-all duration-500"
                >
                  {/* Image Container */}
                  <div className="relative w-full h-56 overflow-hidden group">
                    <Image
                      src={staff.image}
                      alt={staff.name}
                      fill
                      className="object-contain transition-transform duration-700 group-hover:scale-105 rounded-4xl z-0"
                    />

                    {/* Overlay Text (Animated) */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 0.6, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute bottom-10 left-1/2 -translate-x-1/2 gold text-xs md:text-sm tracking-wide font-semibold select-none z-20 "
                    >
                      {staff.overlayText}
                    </motion.div>
                  </div>

                  {/* Text Section */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <h3 className="text-base font-bold text-[var(--brand-gold)] uppercase mb-1">
                      {staff.name}
                    </h3>
                    <p className="text-xs font-semibold uppercase text-[var(--foreground)]/70 mb-2">
                      {staff.role}
                    </p>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="underline decoration-[var(--brand-gold)] cursor-help text-xs">
                          {staff.experience}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>{staff.tooltip}</TooltipContent>
                    </Tooltip>

                    {expandedStaff === index && (
                      <p className="mt-3 text-[var(--foreground)]/80 text-xs leading-relaxed">
                        {staff.bio}
                      </p>
                    )}

                    <button
                      onClick={() =>
                        setExpandedStaff(expandedStaff === index ? null : index)
                      }
                      className="btn-gold mt-3 px-3 py-1.5 rounded-md text-xs font-semibold"
                    >
                      {expandedStaff === index ? "Less ▲" : "More ▼"}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* =============== CTA =============== */}
          <section className="py-20 px-6 md:px-12 bg-[var(--brand-gold)] text-[var(--brand-black)] text-center">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">
                Ready to partner with PetrusWise?
              </h3>
              <p className="mb-6 text-[var(--brand-black)]/85">
                Contact us for a tailored consultation and technical assessment.
              </p>
              <Link href="/contact" className="btn-gold px-6 py-3 rounded-md">
                Contact Us
              </Link>
            </div>
          </section>
        </TooltipProvider>
      </main>
   
  );
}
