"use client"; // Client-side for useState

import { FaLinkedin, FaTwitter, FaGlobe } from "react-icons/fa";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

//----------------------Form Validation Schema-------------------------
const EnquirySchema = z.object({
  name: z.string().min(2, "please provide your full name"),
  email: z.string().email("please enter a valid email"),
});
//----------------------Type Inference-------------------------
type EnquiryType = z.infer<typeof EnquirySchema>;

//----------------------Props-------------------------
type QuickInquiryProps = {
  quickSent: boolean;
  setQuickSent: (value: boolean) => void;
};

//----------------------Quick Inquiry Component-------------------------
export default function QuickInquiry({
  quickSent,
  setQuickSent,
}: QuickInquiryProps) {
  // Initialize react-hook-form with Zod validation
  const { register, handleSubmit, reset } = useForm<EnquiryType>({
    resolver: zodResolver(EnquirySchema),
  });

  // Handle quick inquiry form submission
  const onQuickSubmit = async (data: EnquiryType) => {
    try {
      const response = await fetch("/api/contactForm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setQuickSent(true);
      setTimeout(() => setQuickSent(false), 3500);
    } catch (error) {
      toast.error("Failed to send message. Please try again");
    }
  };

  return (
    <>
      {/* Quick Inquiry + Socials + CTA */}
      <section className="py-16 px-6 md:px-16 bg-black">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8 items-center"
        >
          {/* Quick Inquiry */}
          <div className="lg:col-span-2 p-6 rounded-2xl border border-theme">
            <h4 className="text-lg font-bold text-[var(--brand-gold)] mb-2">
              Quick Inquiry
            </h4>
            <p className="text-sm subheading mb-4 ">
              Short on time? Drop a quick note and we’ll follow up.
            </p>
            <form
              onSubmit={handleSubmit(onQuickSubmit)}
              className="grid sm:grid-cols-3 gap-3"
            >
              <input
                {...register("name")}
                placeholder="Name"
                className="p-3 rounded bg-transparent border border-[var(--brand-gold)]"
              />
              <input
                {...register("email")}
                placeholder="Email"
                className="p-3 rounded bg-transparent border border-[var(--brand-gold)]"
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
          <div className="text-center textVisibility">
            <h4 className="text-lg font-bold mb-3">Follow Us</h4>
            <div className="flex items-center justify-center gap-4 mb-6 textVisibility">
              <a
                href="#"
                aria-label="LinkedIn"
                className="textVisibility p-2 rounded hover:bg-white"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="textVisibility p-2 rounded hover:bg-white"
              >
                <FaTwitter className="w-6 h-6" />
              </a>
              <a
                href="#"
                aria-label="Website"
                className="textVisibility p-2 rounded hover:bg-white"
              >
                <FaGlobe className="w-6 h-6" />
              </a>
            </div>

            <h4 className="text-lg font-semibold mb-2">Ready to Transform?</h4>
            <p className="text-sm textVisibility mb-4">
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
    </>
  );
}
