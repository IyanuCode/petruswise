import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Variants, motion } from "framer-motion";
import { Phone, Mail, MapPin, Linkedin, Twitter, Globe } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

//----------------------Info Cards Component-------------------------
export default function ContactInfoCards() {
  return (
    <TooltipProvider delayDuration={400}>
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
              <div className="p-6 rounded-2xl bg-[var(--foreground)]/5 border border-theme shadow-md hover:shadow-lg transition transform hover:-translate-y-1 text-center">
                <div className="flex items-center justify-center mb-3">
                  <MapPin className="w-7 h-7 text-[var(--brand-gold)]" />
                </div>
                <h3 className="text-lg font-semibold mb-1 text-[var(--heading)]">
                  Address
                </h3>
                <address className="text-sm text-[var(--foreground)]/80">
                  No 1, Igbaja Street, Ilupeju, Lagos Nigeria
                </address>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              Visit our head office by appointment.
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div className="text-center p-6 rounded-2xl bg-[var(--foreground)]/5 border border-theme shadow-md hover:shadow-lg transition transform hover:-translate-y-1">
                <div className="flex items-center justify-center mb-3">
                  <Phone className="w-7 h-7 text-[var(--brand-gold)]" />
                </div>
                <h3 className="text-lg font-semibold mb-1 text-[var(--heading)]">
                  Phone
                </h3>
                <a href ="tel:+2348136142314" className="text-sm text-[var(--foreground)]/80">
                  +234 813 614 2314
                </a>
              </div>
            </TooltipTrigger>
            <TooltipContent>Call Monday–Friday, 9am–5pm WAT</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div className="text-center p-6 rounded-2xl bg-[var(--foreground)]/5 border border-theme shadow-md hover:shadow-lg transition transform hover:-translate-y-1">
                <div className="flex items-center justify-center mb-3">
                  <Mail className="w-7 h-7 text-[var(--brand-gold)]" />
                </div>
                <h3 className="text-lg font-semibold mb-1 text-[var(--heading)]">
                  Email
                </h3>
                <a href="mailto:info@petruswise.com" className="text-sm text-[var(--foreground)]/80">
                  info@petruswise.com
                </a>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              Expect a reply within 1–2 business days
            </TooltipContent>
          </Tooltip>
        </motion.div>
      </section>
    </TooltipProvider>
  );
}
