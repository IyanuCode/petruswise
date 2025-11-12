import { motion, Variants } from "framer-motion";
import Image from "next/image";

export default function RegionalCoverage() {
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
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
          <h3 className="text-2xl font-bold text-[var(--brand-gold)] mb-4 text-center">
            Get To Us From Wherever You Are
          </h3>
          <div className="w-full h-96 border border-theme rounded-lg overflow-hidden shadow-sm">
            <iframe
              title="Google Map showing PetrusWise, Nigeria"
              className="w-full h-full"
              loading="lazy"
              allowFullScreen
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.826798430297!2d3.359035775703403!3d6.54354319344935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8dbe53363705%3A0x56effe168a471472!2s1%20Igbaja%20St%2C%20Onipanu%2C%20Lagos%20102215%2C%20Lagos!5e0!3m2!1sen!2sng!4v1762507271909!5m2!1sen!2sng"
            ></iframe>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
