"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { Variants, motion } from "framer-motion";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Phone, Mail, MapPin, Linkedin, Twitter, Globe } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const ContactSchema = z.object({
  name: z.string().min(2, "Please provide your name"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message should be at least 10 characters"),
});

type ContactData = z.infer<typeof ContactSchema>;

const keyContacts = [
  {
    name: "Mr. Olanrewaju Oresanya",
    role: "CEO / Lead Consultant",
    img: "/ceo.jpg",
    email: "ceo@petruswise.com",
  },
  {
    name: "Mrs. Patricia Augustina",
    role: "Client Relations Lead",
    img: "/olagoke.jpg",
    email: "relations@petruswise.com",
  },
  {
    name: "Mr. Bisi Popoola",
    role: "HR & Org Effectiveness",
    img: "/popoola.jpg",
    email: "hr@petruswise.com",
  },
];

const testimonials = [
  {
    quote:
      "PetrusWise guided our ISO certification — seamless and professional.",
    author: "MD, FMCG Company",
  },
  {
    quote: "Regulatory support that actually saved our launch timetable.",
    author: "Head of R&D, Consumer Goods",
  },
];

const partnerLogos = ["/missionIcon.png", "/eye.png", "/network.png"]; // replace with actual logo assets

export default function ContactFullPage() {
  const [quickSent, setQuickSent] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<ContactData>({ resolver: zodResolver(ContactSchema) });

  const onSubmit = (data: ContactData) => {
    // replace with your API/email handler
    console.log("Contact form:", data);
    alert("Message sent. We will get back to you shortly.");
    reset();
  };

  const onQuickSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuickSent(true);
    setTimeout(() => setQuickSent(false), 3500);
  };
  return (
    <TooltipProvider delayDuration={400}>
      {/* JSON-LD Organization Schema */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "PetrusWise Limited",
            url: "https://your-site.example",
            logo: "https://your-site.example/logo.png",
            contactPoint: [
              {
                "@type": "ContactPoint",
                telephone: "+2348031234567",
                contactType: "customer service",
                areaServed: "NG",
              },
            ],
            sameAs: [
              "https://www.linkedin.com/your-company",
              "https://twitter.com/your-company",
            ],
          }),
        }}
      />

      <main className="bg-[var(--background)] text-[var(--foreground)]">
        {/* HERO */}
        <section className="relative h-[64vh] flex items-center justify-center overflow-hidden">
          <Image
            src="/hero5.jpg"
            alt="Contact PetrusWise"
            fill
            priority
            className="object-cover brightness-[.6]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.9 } },
            }}
            className="relative z-10 text-center px-6 max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-[var(--brand-gold)] mb-4 uppercase tracking-wide">
              Contact PetrusWise
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto font-semibold petruswise [text-shadow:0.5px_0.5px_1px_white]">
              We help organisations across Africa design systems, meet
              regulatory requirements and build resilient teams.
            </p>
          </motion.div>
        </section>

        {/* Intro / Trust */}
        <section className="py-12 md:py-16 px-6 md:px-16 bg-[var(--foreground)]/5">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--brand-gold)] mb-3">
              Let’s talk solutions
            </h2>
            <p className="text-[var(--foreground)]/80 leading-relaxed">
              Whether you need regulatory clarity, ISO support, or a people
              strategy that scales — our consultants are ready. Submit your
              inquiry and we'll respond with practical next steps.
            </p>
          </motion.div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-12 px-6 md:px-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8"
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="p-6 rounded-2xl bg-[var(--foreground)]/5 border border-theme shadow-md hover:shadow-lg transition transform hover:-translate-y-1">
                  <div className="flex items-center justify-center mb-3">
                    <MapPin className="w-7 h-7 text-[var(--brand-gold)]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1 text-[var(--heading)]">
                    Address
                  </h3>
                  <p className="text-sm text-[var(--foreground)]/80">
                    Suite 9, Revolution Plaza, Oba Adesida Road, Akure, Ondo
                    State
                  </p>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                Visit our head office by appointment.
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <div className="p-6 rounded-2xl bg-[var(--foreground)]/5 border border-theme shadow-md hover:shadow-lg transition transform hover:-translate-y-1">
                  <div className="flex items-center justify-center mb-3">
                    <Phone className="w-7 h-7 text-[var(--brand-gold)]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1 text-[var(--heading)]">
                    Phone
                  </h3>
                  <p className="text-sm text-[var(--foreground)]/80">
                    +234 803 123 4567
                  </p>
                </div>
              </TooltipTrigger>
              <TooltipContent>Call Monday–Friday, 9am–5pm WAT</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <div className="p-6 rounded-2xl bg-[var(--foreground)]/5 border border-theme shadow-md hover:shadow-lg transition transform hover:-translate-y-1">
                  <div className="flex items-center justify-center mb-3">
                    <Mail className="w-7 h-7 text-[var(--brand-gold)]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1 text-[var(--heading)]">
                    Email
                  </h3>
                  <p className="text-sm text-[var(--foreground)]/80">
                    info@petruswise.com
                  </p>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                Expect a reply within 1–2 business days
              </TooltipContent>
            </Tooltip>
          </motion.div>
        </section>

        {/* Main Form + Key Contacts */}
        <section className="py-12 px-6 md:px-16">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
            {/* Form */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-[var(--background)] border border-theme rounded-2xl shadow-md p-8"
            >
              <h3 className="text-2xl font-bold mb-4 text-[var(--brand-gold)]">
                Send Us A Message
              </h3>
              <p className="text-sm mb-6 text-[var(--foreground)]/80">
                Provide a few details and we'll get back with a practical next
                step.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                <div>
                  <label className="block text-sm mb-1 font-medium">Name</label>
                  <input
                    {...register("name")}
                    type="text"
                    className="w-full p-3 rounded-lg bg-[var(--background)] border border-theme focus:ring-2 focus:ring-[var(--brand-gold)]"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm mb-1 font-medium">
                    Email
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    className="w-full p-3 rounded-lg bg-[var(--background)] border border-theme focus:ring-2 focus:ring-[var(--brand-gold)]"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm mb-1 font-medium">
                    Message
                  </label>
                  <textarea
                    {...register("message")}
                    rows={5}
                    className="w-full p-3 rounded-lg bg-[var(--background)] border border-theme focus:ring-2 focus:ring-[var(--brand-gold)]"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn-gold px-6 py-3 rounded-md font-semibold mt-2"
                >
                  Send Message
                </button>
                {isSubmitSuccessful && (
                  <p className="text-green-600 mt-3">
                    Thanks — your message was sent.
                  </p>
                )}
              </form>
            </motion.div>

            {/* Key Contacts */}
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
                    <div className="w-20 h-20 relative rounded-md overflow-hidden bg-black/5">
                      <Image
                        src={p.img}
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
                        {p.email}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Testimonials */}
              <div className="mt-6 p-4 rounded-lg bg-[var(--background)] border border-theme">
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
              </div>
            </motion.div>
          </div>
        </section>

        {/* Offices / Reach Map image */}
       <div className="bg-[var(--foreground)]/5 flex flex-col md:flex-row rounded-t-2xl rounded-b-xl overflow-hidden">
  {/* West Africa Coverage Section */}
  <section className="py-12 px-6 md:px-16 flex-1">
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="max-w-6xl mx-auto text-center"
    >
      <h3 className="text-2xl font-bold text-[var(--brand-gold)] mb-4">
        Our Reach Across West Africa
      </h3>

      <p className="text-[var(--foreground)]/80 mb-6 leading-relaxed">
        We implement projects and support clients throughout West Africa —
        combining local insight with global standards.
      </p>

      <div className="mx-auto max-w-4xl">
        <Image
          src="/west.png"
          alt="Map showing our reach across West Africa"
          width={1000}
          height={500}
          className="object-contain mx-auto rounded-lg shadow-md"
          priority
        />
      </div>
    </motion.div>
  </section>

  {/* Google Map Section */}
  <section className="py-8 px-6 md:px-16 flex-1 border-t md:border-t-0 md:border-l border-[var(--brand-gold)] rounded-b-xl md:rounded-b-none md:rounded-r-2xl overflow-hidden">
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="max-w-6xl mx-auto"
    >
      <div className="w-full h-96 border border-theme rounded-lg overflow-hidden shadow-sm">
        <iframe
          title="Google Map showing Akure, Nigeria"
          className="w-full h-full"
          loading="lazy"
          allowFullScreen
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.454034953396!2d5.199!3d7.252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103a9d37a7!2sAkure!5e0!3m2!1sen!2sng!4v000000000"
        ></iframe>
      </div>
    </motion.div>
  </section>
</div>


       

        {/* Partners / Logos */}
        <section className="py-10 px-6 md:px-16 bg-[var(--background)] border-t border-theme">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <h4 className="text-sm text-[var(--foreground)]/80 mb-6">
              Trusted by
            </h4>
            <div className="flex items-center justify-center gap-8 flex-wrap">
              {partnerLogos.map((src, i) => (
                <div
                  key={i}
                  className="w-36 h-16 flex items-center justify-center opacity-90"
                >
                  <Image
                    src={src}
                    alt={`partner-${i}`}
                    width={60}
                    height={64}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Quick Inquiry + Socials + CTA */}
        <section className="py-16 px-6 md:px-16 bg-[var(--brand-black)] text-white">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8 items-center"
          >
            {/* Quick Inquiry */}
            <div className="lg:col-span-2 bg-[var(--foreground)]/5 p-6 rounded-2xl border border-theme">
              <h4 className="text-lg font-bold text-[var(--brand-gold)] mb-2">
                Quick Inquiry
              </h4>
              <p className="text-sm text-[var(--foreground)]/80 mb-4">
                Short on time? Drop a quick note and we’ll follow up.
              </p>
              <form
                onSubmit={onQuickSubmit}
                className="grid sm:grid-cols-3 gap-3"
              >
                <input
                  name="qname"
                  placeholder="Name"
                  className="p-3 rounded bg-transparent border border-[var(--brand-gold)] text-white"
                />
                <input
                  name="qemail"
                  placeholder="Email"
                  className="p-3 rounded bg-transparent border border-[var(--brand-gold)] text-white"
                />
                <button
                  type="submit"
                  className="btn-gold px-6 py-2 rounded-md font-semibold"
                >
                  {quickSent ? "Sent ✓" : "Send"}
                </button>
              </form>
            </div>

            {/* Socials & CTA */}
            <div className="text-center">
              <h4 className="text-lg font-bold text-[var(--brand-gold)] mb-3">
                Follow Us
              </h4>
              <div className="flex items-center justify-center gap-4 mb-6">
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="p-2 rounded hover:bg-white/5"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  aria-label="Twitter"
                  className="p-2 rounded hover:bg-white/5"
                >
                  <Twitter className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  aria-label="Website"
                  className="p-2 rounded hover:bg-white/5"
                >
                  <Globe className="w-6 h-6" />
                </a>
              </div>

              <h4 className="text-lg font-semibold mb-2">
                Ready to Transform?
              </h4>
              <p className="text-sm text-[var(--foreground)]/80 mb-4">
                Partner with PetrusWise for practical, standards-driven
                transformation.
              </p>
              <Link
                href="/contact"
                className="inline-block btn-gold px-6 py-3 rounded-md font-semibold"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
    </TooltipProvider>
  );
}