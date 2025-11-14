'use client';

import { Variants, motion } from 'framer-motion';
import Link from 'next/link';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeInOut' },
  },
};

export default function ServicesCTA() {
  return (
    <TooltipProvider delayDuration={150}>
      <section className="py-24 px-6 md:px-16 bg-[var(--brand-gold)] text-center border-t border-[var(--brand-gold)]/20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-white"
        >
          <h2 className="text-4xl font-bold mb-4 uppercase tracking-wide">
            Ready to Elevate Your Organization?
          </h2>
          <p className="text-lg mb-8 text-gray-300">
            Let PetrusWise guide your business toward sustainable compliance and
            excellence.
          </p>

          {/* Tooltip on the Contact button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/contact"
                className="btn-gold px-8 py-3 rounded-lg font-semibold border-2 border-white transition-all hover:bg-white hover:text-[var(--brand-gold)]"
              >
                Contact Us
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Reach out to our consultants today</p>
            </TooltipContent>
          </Tooltip>
        </motion.div>
      </section>
    </TooltipProvider>
  );
}
