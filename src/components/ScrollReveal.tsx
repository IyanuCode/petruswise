// components/ScrollReveal.tsx
"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, ReactNode } from "react";

export default function ScrollReveal({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, { once: false, margin: "-100px" });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

