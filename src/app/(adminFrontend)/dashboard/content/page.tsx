"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, Home, Info, Settings, Phone } from "lucide-react";

const pages = [
  {
    name: "Home Page",
    slug: "homepage",
    icon: <Home className="w-5 h-5 text-[var(--brand-gold)]" />,
    description: "Manage hero text, intro, and featured content.",
  },
  {
    name: "About Page",
    slug: "about",
    icon: <Info className="w-5 h-5 text-[var(--brand-gold)]" />,
    description: "Edit company overview, mission, and vision.",
  },
  {
    name: "Services Page",
    slug: "services",
    icon: <Settings className="w-5 h-5 text-[var(--brand-gold)]" />,
    description: "Update your list of services and details.",
  },
  {
    name: "Contact Page",
    slug: "contact",
    icon: <Phone className="w-5 h-5 text-[var(--brand-gold)]" />,
    description: "Modify contact info, form text, and location.",
  },
];

export default function ContentDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-[var(--brand-gold)]">
          Manage Website Content
        </h1>
        <p className="text-[var(--muted)] mt-2">
          Choose a page below to edit its content.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pages.map((page, i) => (
          <motion.div
            key={page.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link href={`/dashboard/content/${page.slug}`}>
              <div className="border border-[var(--border)] bg-[var(--background)] hover:border-[var(--brand-gold)] transition-all duration-200 rounded-xl p-6 shadow-sm hover:shadow-md cursor-pointer group">
                <div className="flex items-center gap-3 mb-3">
                  {page.icon}
                  <h2 className="text-xl font-semibold text-[var(--heading)] group-hover:text-[var(--brand-gold)]">
                    {page.name}
                  </h2>
                </div>
                <p className="text-[var(--muted)] text-sm leading-relaxed">
                  {page.description}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
