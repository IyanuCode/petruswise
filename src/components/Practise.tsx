"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const FADE_UP = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.6 } }),
};

const team = [
  {
    id: "t1",
    name: "Mrs. Tolulope Adeusi",
    role: "Director of Operations",
    img: "/hero2.jpg",
    short: "Operations leader focused on delivering measurable results and operational excellence.",
    long: "Tolulope brings 14+ years of operations and program management across regulatory and quality domains. She leads client delivery, internal compliance, and capacity development programmes. Passionate about mentoring teams, Tolulope ensures projects translate into measurable client outcomes.",
  },
  {
    id: "t2",
    name: "Engr. Chinedu Okonkwo",
    role: "Head — Technical Assurance",
    img: "/hero3.jpg",
    short: "Technical assurance lead with deep laboratory & systems experience.",
    long: "Chinedu is a laboratory systems and QA specialist with experience in ISO/IEC 17025 implementations, testing program design, and QA audits. He focuses on building resilient technical systems and training lab staff for long-term capability.",
  },
  {
    id: "t3",
    name: "Mrs. Funmi Adeyemi",
    role: "Client Success Manager",
    img: "/hero4.jpg",
    short: "Client-facing lead ensuring value delivery & long-term partnerships.",
    long: "Funmi manages client relationships from onboarding to outcomes, ensuring projects stay on track and generate clear ROI. She coordinates cross-functional teams and champions client-first processes and continuous improvement.",
  },
];

export default function Practise() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => setExpanded((s) => ({ ...s, [id]: !s[id] }));

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)] transition-colors duration-400">
      {/* HERO */}
      <section className="relative h-[56vh] md:h-[60vh] flex items-center">
        <Image
          src="/hero.jpg"
          alt="PetrusWise About Hero"
          fill
          priority
          className="object-cover brightness-80 dark:brightness-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="container mx-auto relative z-10 px-6 md:px-12 lg:px-20">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-[var(--brand-gold)]">
              About PetrusWise
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl text-[var(--foreground)]/90">
              We help organisations build resilient systems — blending regulatory insight, quality assurance, and practical
              strategies to transform compliance into competitive advantage.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ABOUT + QUICK STATS */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 md:px-12 grid gap-10 md:grid-cols-3 items-start">
          <motion.div variants={FADE_UP} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Who we are</h2>
            <p className="text-[var(--foreground)]/85 leading-relaxed">
              PetrusWise is a strategic consulting firm helping public and private sector organisations achieve regulatory compliance,
              operational excellence and sustainable growth. We combine systems thinking with practical implementation to ensure results
              that endure.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-[var(--foreground)]/80">
              <li>• Offices across multiple states; regional delivery teams</li>
              <li>• Specialists in regulatory compliance, QA systems & training</li>
              <li>• Long-term partnership & capacity-building approach</li>
            </ul>
          </motion.div>

          <motion.div variants={FADE_UP} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} className="md:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { k: "Years", v: "12+" },
                { k: "Clients", v: "100+" },
                { k: "Certs Delivered", v: "50+" },
              ].map((s, i) => (
                <div key={i} className="p-6 bg-gradient-to-br from-white/60 to-[var(--brand-gold)]/6 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-[var(--foreground)]/70">{s.k}</div>
                  <div className="mt-2 text-2xl md:text-3xl font-bold text-[var(--brand-black)] dark:text-[var(--brand-gold)]">{s.v}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-14 md:py-20 bg-[var(--background)]">
        <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-8 items-start">
          <motion.div variants={FADE_UP} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}>
            <h3 className="text-xl font-semibold mb-3 text-[var(--brand-black)] dark:text-[var(--brand-gold)]">Our Mission</h3>
            <p className="leading-relaxed text-[var(--foreground)]/85">
              To be the foremost consulting partner providing practical, standards-driven solutions that promote safety, quality,
              and sustainable growth across industries.
            </p>
          </motion.div>

          <motion.div variants={FADE_UP} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}>
            <h3 className="text-xl font-semibold mb-3 text-[var(--brand-black)] dark:text-[var(--brand-gold)]">Our Vision</h3>
            <p className="leading-relaxed text-[var(--foreground)]/85">
              To build organizations that meet and exceed global standards — enabling stakeholders to trust processes and outcomes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* OUR EDGE */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 md:px-12">
          <motion.h3 variants={FADE_UP} initial="hidden" whileInView="visible" className="text-3xl font-bold mb-8 text-[var(--brand-black)] dark:text-[var(--brand-gold)]">
            Our Edge
          </motion.h3>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: "Regulatory Mastery", desc: "Deep regulatory experience across sectors; we translate legislation into practical programs." },
              { title: "Systems-first", desc: "We design systems that scale — from labs to corporate processes." },
              { title: "Practical Implementation", desc: "Strategy + hands-on implementation ensures ideas become operations." },
              { title: "Capacity Building", desc: "We train people not just processes — long-term capability is central." },
              { title: "Network & Influence", desc: "Strong relationships with regulators and industry partners ensure faster outcomes." },
            ].map((it, i) => (
              <motion.div key={i} variants={FADE_UP} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} className="p-6 bg-[var(--background)] rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition">
                <div className="mb-2 text-[var(--brand-gold)] font-semibold">{String.fromCharCode(65 + i)}.</div>
                <h4 className="text-lg font-semibold mb-2 text-[var(--brand-black)] dark:text-[var(--brand-gold)]">{it.title}</h4>
                <p className="text-[var(--foreground)]/85">{it.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE BELIEFS / VALUES (grid bigger) */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-[var(--background)] to-white/60 dark:from-[#070707] dark:to-[#0b0b0b]">
        <div className="container mx-auto px-6 md:px-12">
          <motion.h3 variants={FADE_UP} initial="hidden" whileInView="visible" className="text-3xl font-bold mb-8 text-[var(--brand-black)] dark:text-[var(--brand-gold)]">
            Core Beliefs
          </motion.h3>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { t: "Integrity", d: "We act transparently, ethically, and fairly." },
              { t: "Excellence", d: "Quality in every deliverable is non-negotiable." },
              { t: "Client-first", d: "We prioritize client outcomes and sustainable value." },
              { t: "Learning", d: "Continuous improvement and research-driven practices." },
              { t: "Stewardship", d: "Responsible growth with societal and environmental empathy." },
              { t: "Collaboration", d: "We partner with clients and regulators to drive impact." },
            ].map((v, i) => (
              <motion.div key={i} variants={FADE_UP} initial="hidden" whileInView="visible" className="p-6 rounded-xl bg-[var(--background)] border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="text-[var(--brand-gold)] font-semibold mb-2">{v.t}</div>
                <p className="text-[var(--foreground)]/85">{v.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR APPROACH (visual 3-step) */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-10 items-start">
          <div className="md:w-1/2">
            <motion.h3 variants={FADE_UP} initial="hidden" whileInView="visible" className="text-3xl font-bold mb-4 text-[var(--brand-black)] dark:text-[var(--brand-gold)]">
              Our Approach
            </motion.h3>
            <p className="text-[var(--foreground)]/85 mb-6">
              We follow a pragmatic roadmap: understand the organisation, analyse against standards and risk, and deliver tailored systems plus capacity uplift.
            </p>

            <div className="space-y-6">
              {[
                { step: "Discover", text: "Deep diagnostics, stakeholder interviews, system mapping and risk profiling." },
                { step: "Design", text: "Co-created frameworks, SOPs, and control plans aligned to objectives." },
                { step: "Deliver", text: "Implementation, training, audits and sustained handover support." },
              ].map((s, i) => (
                <motion.div key={i} variants={FADE_UP} initial="hidden" whileInView="visible" className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[var(--brand-gold)] text-black font-bold">{i + 1}</div>
                  <div>
                    <h4 className="font-semibold text-lg">{s.step}</h4>
                    <p className="text-[var(--foreground)]/85">{s.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* visual / quote card */}
          <div className="md:w-1/2">
            <motion.div variants={FADE_UP} initial="hidden" whileInView="visible" className="rounded-2xl p-8 bg-[var(--background)] border border-gray-200 dark:border-gray-700 shadow-lg">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full overflow-hidden relative">
                  <Image src="/hero.jpg" alt="CEO" fill className="object-cover" />
                </div>
                <div>
                  <div className="text-[var(--brand-gold)] font-semibold">Message from the CEO</div>
                  <h4 className="text-xl font-bold">Dr. Peter Adewusi</h4>
                  <p className="text-[var(--foreground)]/85 italic mt-2">“We believe systems, people and purpose together deliver lasting organizational resilience.”</p>
                </div>
              </div>

              <div className="mt-6 text-[var(--foreground)]/85">
                <p>
                  Our engagements start with empathy — we listen first, then design practical systems that people adopt.
                  We want clients to look back and see real transformation: safer processes, dependable quality, and measurable
                  improvements in performance.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP — CEO full profile + team read-more */}
      <section className="py-16 md:py-24 bg-[var(--background)]">
        <div className="container mx-auto px-6 md:px-12">
          <motion.h3 variants={FADE_UP} initial="hidden" whileInView="visible" className="text-3xl font-bold mb-8 text-[var(--brand-black)] dark:text-[var(--brand-gold)]">
            Leadership
          </motion.h3>

          {/* CEO FULL PROFILE */}
          <div className="grid md:grid-cols-3 gap-8 items-start mb-12">
            <div className="md:col-span-1">
              <div className="w-56 h-56 rounded-2xl overflow-hidden relative shadow-xl">
                <Image src="/hero.jpg" alt="Dr. Peter Adewusi" fill className="object-cover" />
              </div>
            </div>

            <div className="md:col-span-2">
              <h4 className="text-2xl font-bold">Dr. Peter Adewusi</h4>
              <div className="text-[var(--brand-gold)] font-medium mb-4">Chief Executive Officer</div>
              <p className="text-[var(--foreground)]/85 leading-relaxed mb-4">
                Dr. Peter Adewusi is a highly experienced leader in quality systems, regulatory compliance, and institutional capacity building.
                Over a career spanning more than two decades, Dr. Adewusi has led national-level technical projects, supported multiple
                laboratories to ISO/IEC 17025 accreditation, and helped organisations design sustainable management systems.
              </p>

              <p className="text-[var(--foreground)]/85 mb-4">
                He holds a PhD in Quality Systems & Management and has been an invited expert on regulatory harmonisation projects across
                public and private sectors. Peter’s practical approach blends technical depth with people-centred change management —
                ensuring that systems delivered are owned and sustained by staff.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-[var(--background)] border border-gray-200 dark:border-gray-700">
                  <div className="text-xs text-[var(--foreground)]/70">Education</div>
                  <div className="font-medium">PhD — Quality Systems & Management</div>
                </div>
                <div className="p-4 rounded-lg bg-[var(--background)] border border-gray-200 dark:border-gray-700">
                  <div className="text-xs text-[var(--foreground)]/70">Experience</div>
                  <div className="font-medium">20+ years — labs, industry regulation, capacity building</div>
                </div>
              </div>

              <div className="mt-6 flex gap-4">
                <Link href="/contact" className="px-5 py-2 rounded-md bg-[var(--brand-gold)] text-black font-semibold">
                  Contact the CEO
                </Link>
                <Link href="/team" className="px-5 py-2 rounded-md border border-gray-300 dark:border-gray-700">
                  Meet the Team
                </Link>
              </div>
            </div>
          </div>

          {/* OTHER STAFF - collapsible read more */}
          <div className="grid md:grid-cols-3 gap-6">
            {team.map((m) => (
              <motion.div key={m.id} variants={FADE_UP} initial="hidden" whileInView="visible" className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-[var(--background)] shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden relative flex-shrink-0">
                    <Image src={m.img} alt={m.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="text-lg font-semibold">{m.name}</div>
                    <div className="text-sm text-[var(--brand-gold)] mb-2">{m.role}</div>
                    <div className="text-sm text-[var(--foreground)]/85 mb-3">{m.short}</div>

                    {expanded[m.id] ? (
                      <>
                        <div className="text-sm text-[var(--foreground)]/85 mb-3">{m.long}</div>
                        <button onClick={() => toggle(m.id)} className="text-sm text-[var(--brand-gold)] font-semibold">Read less</button>
                      </>
                    ) : (
                      <button onClick={() => toggle(m.id)} className="text-sm text-[var(--brand-gold)] font-semibold">Read more</button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 md:py-20 bg-[var(--brand-gold)] text-black">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <motion.h3 variants={FADE_UP} initial="hidden" whileInView="visible" className="text-3xl md:text-4xl font-bold mb-4">
            Ready to partner with PetrusWise?
          </motion.h3>
          <p className="max-w-2xl mx-auto mb-6 text-[var(--brand-black)]/80">
            Let’s design systems that protect value, improve performance and create long-term resilience.
          </p>
          <div className="inline-flex gap-4">
            <Link href="/contact" className="px-6 py-3 rounded-md bg-white text-[var(--brand-black)] font-semibold">Get in touch</Link>
            <a href="/Petruswise Complete CP.pdf" className="px-6 py-3 rounded-md border border-white/30 text-white">Download Company Profile</a>
          </div>
        </div>
      </section>
    </main>
  );
}
