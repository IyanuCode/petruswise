"use client";

import { Variants, motion } from "framer-motion";
import Image from "next/image";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { ServicePageType } from "@/types/services";
import { useState } from "react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeInOut" },
  },
};

type ServicesGridProps = {
  servicesData: ServicePageType;
};

export default function ServicesGrid({ servicesData }: ServicesGridProps) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <TooltipProvider delayDuration={150}>
      <section className="py-24 px-6 md:px-16 border-t border-[var(--brand-gold)]/20">
        {/* Section Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }} 
          // transition={{ delay: i * 0.1 }}
          className="max-w-6xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold gold uppercase mb-3">
            What We Do
          </h2>
          <p className="text-[var(--foreground)]/70 max-w-2xl mx-auto">
            Each <span className="petruswise">PetrusWise</span> service is
            designed to create measurable impact — combining global standards
            with local insight.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {servicesData.services.map((serviceItem, i) => (
            <motion.div
              key={serviceItem.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-[var(--foreground)]/5 border border-[var(--brand-gold)]/30 rounded-2xl overflow-hidden shadow-md hover:shadow-[0_0_20px_rgba(255,215,0,0.25)] transition-all duration-500"
            >
              {/* Tooltip wrapping the entire card */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-pointer">
                    {/* Service Image */}
                    <div className="relative w-full h-52 overflow-hidden">
                      <Image
                        src={serviceItem.imageUrl}
                        alt={serviceItem.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-70" />
                    </div>

                    {/* Service Content */}
                    <div className="p-6 relative z-10 text-center flex flex-col justify-between">
                      <h3 className="text-xl font-bold uppercase text-[var(--brand-gold)] mb-2 tracking-wide">
                        {serviceItem.title}
                      </h3>
                      <p className="text-xs italic text-[var(--foreground)]/70 mb-3">
                        “{serviceItem.quote}”
                      </p>
                      <p className="text-sm text-[var(--foreground)]/80 leading-relaxed mb-4">
                        {expanded === i
                          ? serviceItem.description
                          : `${serviceItem.description.slice(0, 120)}...`}
                      </p>

                      {/* Read More / Collapse Button with its own tooltip */}
                      <div className="flex justify-center">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              onClick={() =>
                                setExpanded(expanded === i ? null : i)
                              }
                              className="btn-gold px-4 py-1.5 rounded-md text-xs font-semibold transition-all"
                            >
                              {expanded === i ? "Read Less ▲" : "Read More ▼"}
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              {expanded === i
                                ? "Collapse service details"
                                : "View full description for this service"}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Learn more about {serviceItem.title}</p>
                </TooltipContent>
              </Tooltip>
            </motion.div>
          ))}
        </div>
      </section>
    </TooltipProvider>
  );
}
