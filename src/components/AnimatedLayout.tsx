"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function AnimatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex-1"
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
