'use client';

import {Variants, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

const fadeUp:Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, 
  transition: { duration: 0.8, ease: 'easeInOut' } },
};

const servicesData = [
  {
    title: 'Management Systems Consulting',
    quote: 'Our approach is holistic. We begin by understanding the nature and structure of your organization.',
    desc: 'We design and implement globally recognized systems like ISO 9001, 14001, 45001, and 22000, aligning compliance with strategy for sustainable operational excellence.',
    img: '/hero5.jpg',
    slug: 'management-systems',
  },
  {
    title: 'Regulatory Consulting & Advisory',
    quote: 'We turn regulatory bottlenecks into bridges.',
    desc: 'From NAFDAC to SON and NESREA, we help businesses navigate compliance with confidence — building proactive systems that ensure long-term regulatory trust.',
    img: '/Regulatory .jpg',
    slug: 'regulatory-consulting',
  },
  {
    title: 'Quality Assurance & Laboratory Systems',
    quote: 'Quality must be engineered into the DNA of every organization.',
    desc: 'We develop robust QA systems and lab processes that meet ISO/IEC 17025 and TQM standards, ensuring reliability, consistency, and brand excellence.',
    img: '/28.png',
    slug: 'quality-assurance',
  },
  {
    title: 'Customer Complaint Management',
    quote: 'Every customer complaint is a data point, a lesson, and a chance to improve.',
    desc: 'We build complaint management frameworks that capture insights and transform feedback into innovation, loyalty, and measurable satisfaction.',
    img: '/comp.jpg',
    slug: 'complaint-management',
  },
  {
    title: 'Human Capital Development',
    quote: 'Your workforce is not just a support system — it is your greatest asset.',
    desc: 'We deliver training and leadership programs that build competence, culture, and confidence — preparing your people for tomorrow’s opportunities.',
    img: '/9.png',
    slug: 'human-capital',
  },
  {
    title: 'Business Process Improvement',
    quote: 'Every thriving organization is built on efficient processes.',
    desc: 'Using Lean, Six Sigma, and Kaizen methodologies, we redesign workflows for clarity, speed, and performance-driven results.',
    img: '/BPI.png',
    slug: 'process-improvement',
  },
  {
    title: 'Educational Consulting',
    quote: 'We help individuals unlock global opportunities.',
    desc: 'From career guidance to scholarships, we guide students and professionals to achieve local and international academic success.',
    img: '/educa.png',
    slug: 'educational-consulting',
  },
  {
    title: 'Training & Development',
    quote: 'Training is not a tick-box activity — it is a strategic enabler of transformation.',
    desc: 'Our training combines theory with hands-on impact — covering compliance, leadership, communication, and change management.',
    img: '/Training.jpg',
    slug: 'training',
  },
  {
    title: 'Human Resource Services',
    quote: 'Finding the right people is just the beginning.',
    desc: 'We provide recruitment, outsourcing, and performance systems that align people strategy with business strategy for enduring success.',
    img: '/5.jpg',
    slug: 'hr-services',
  },
];

export default function ServicesPage() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      {/* -------- HERO -------- */}
      <section className="relative h-[65vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/hero1.jpg"
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
          <h1 className="text-4xl md:text-6xl font-extrabold text-[var(--brand-gold)] mb-4 uppercase tracking-wide [text-shadow:0.2px_0.2px_1px_white]">
            Our Services
          </h1>
          <p className="max-w-3xl mx-auto petruswise text-base md:text-lg  [text-shadow:0.2px_0.2px_1px_white]
">
            We deliver tailored consulting solutions that help organizations grow with speed, quality, and value.
          </p>
        </motion.div>
      </section>

      {/* -------- SERVICES GRID -------- */}
      <section className="py-24 px-6 md:px-16 border-t border-[var(--brand-gold)]/20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold gold uppercase mb-3">
            What We Do
          </h2>
          <p className="text-[var(--foreground)]/70 max-w-2xl mx-auto">
            Each <span className='petruswise'>PetrusWise</span> service is designed to create measurable impact — combining global standards with local insight.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {servicesData.map((service, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-[var(--foreground)]/5 border border-[var(--brand-gold)]/30 rounded-2xl overflow-hidden shadow-md hover:shadow-[0_0_20px_rgba(255,215,0,0.25)] transition-all duration-500"
            >
              {/* Service Image */}
              <div className="relative w-full h-52 overflow-hidden">
                <Image
                  src={service.img}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-70" />
              </div>

              {/* Content */}
              <div className="p-6 relative z-10 text-center flex flex-col justify-between">
                <h3 className="text-xl font-bold uppercase text-[var(--brand-gold)] mb-2 tracking-wide">
                  {service.title}
                </h3>
                <p className="text-xs italic text-[var(--foreground)]/70 mb-3">
                  “{service.quote}”
                </p>
                <p className="text-sm text-[var(--foreground)]/80 leading-relaxed mb-4">
                  {expanded === i ? service.desc : `${service.desc.slice(0, 120)}...`}
                </p>

                <div className="flex justify-center">
                  <button
                    onClick={() => setExpanded(expanded === i ? null : i)}
                    className="btn-gold px-4 py-1.5 rounded-md text-xs font-semibold transition-all"
                  >
                    {expanded === i ? 'Read Less ▲' : 'Read More ▼'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* -------- CTA -------- */}
      <section className="py-24 px-6 md:px-16 bg-[var(--brand-gold)] text-center border-t border-[var(--brand-gold)]/20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-white"
        >
          <h2 className="text-4xl font-bold mb-4  uppercase tracking-wide">
            Ready to Elevate Your Organization?
          </h2>
          <p className="text-lg mb-8 text-gray-300 ">
            Let PetrusWise guide your business toward sustainable compliance and excellence.
          </p>
          <Link href="/contact" className="btn-gold px-8 py-3 rounded-lg font-semibold border-2 hover:scale-3d border-white">
            Contact Us
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
