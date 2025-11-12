import {motion} from "framer-motion";
import Image from "next/image";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";


export default function CeoProfile() {
      const [expanded, setExpanded] = useState(false);
      const [expandedStaff, setExpandedStaff] = useState<number | null>(null);
  return (
    //   CEO PROFILE — dedicated, rich, unique layout 
    <TooltipProvider> 
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
      </TooltipProvider>
  )
}
