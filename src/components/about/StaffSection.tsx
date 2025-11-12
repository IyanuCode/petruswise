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
import { AboutPageType } from "@/types/about";

type staffSectionProps = {
  staffData: AboutPageType["staff"];
}
export default function StaffSection({staffData}:staffSectionProps) {
    const [expanded, setExpanded] = useState(false);
  const [expandedStaff, setExpandedStaff] = useState<number | null>(null);
  return (
    <TooltipProvider>
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
  )
}
