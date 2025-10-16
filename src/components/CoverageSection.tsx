"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

// Animated number component
function AnimatedNumber({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const [displayValue, setDisplayValue] = React.useState(0);

  React.useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = value / (duration / 16);
    let current = start;

    const counter = setInterval(() => {
      current += increment;
      if (current >= value) {
        current = value;
        clearInterval(counter);
      }
      setDisplayValue(Math.floor(current));
    }, 16);

    return () => clearInterval(counter);
  }, [value]);

  return <span className={className}>{displayValue.toLocaleString()}</span>;
}

export default function CoverageSection() {
  const stats = [
    { label: "Projects Completed", value: 50 },
    { label: "Location Covered", value: 8 },
    { label: "People Impacted", value: 15000 },
  ];

  const legendItems = [
    { color: "black", label: "Location of executed projects" },
    { color: "#CC9933", label: "Location of existing network" },
  ];

  const pins = [
    { top: "33%", left: "50%", color: "#CC9933", duration: 2 },
    { top: "47%", left: "70%", color: "black", duration: 2 },
    { top: "15%", left: "38%", color: "#CC9933", duration: 2.5 },
    { top: "25%", left: "55%", color: "black", duration: 2.5 },
    { top: "75%", left: "65%", color: "black", duration: 2.2 },
  ];

  return (
    <>
      <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between px-6 py-20 gap-10">
        {/* Left Column: Text + Legend */}
        <motion.div
          className="md:w-1/3"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-6">
            OUR COVERAGE
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            We implement projects across{" "}
            <span className="text-black font-medium">West Africa</span>
            and have footprints in other parts of Africa. PetrusWise continues
            to expand its presence, connecting communities and driving
            sustainable impact.
          </p>

          {/* Legend with hover animation */}
          <div className="space-y-4">
            {legendItems.map((item, idx) => (
              <motion.div
                key={idx}
                className="flex items-center gap-3 cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <span
                  className={`w-5 h-5 rounded-full`}
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-gray-700 font-medium">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Center Column: Map with Animated Pins */}
        <motion.div
          className="md:w-1/3 flex justify-center relative"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
        >
          <Image
            src="/AfricanMap.png"
            alt="PetrusWise Topology"
            width={400}
            height={400}
            className="rounded-xl "
          />

          {pins.map((pin, idx) => (
            <motion.span
              key={idx}
              className="absolute w-4 h-4 rounded-full shadow-md"
              style={{
                top: pin.top,
                left: pin.left,
                backgroundColor: pin.color,
              }}
              animate={{ y: [0, -8, 0] }}
              transition={{
                repeat: Infinity,
                duration: pin.duration,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        {/* Right Column: Stats + CTA */}
        <motion.div
          className="mx-auto md:w-1/3 flex flex-col items-center md:items-start gap-6"
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Stats with Animated Numbers */}
          <div className="space-y-6 text-center md:text-left">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.3, duration: 0.8 }}
              >
                <AnimatedNumber
                  value={stat.value}
                  className="text-3xl font-bold text-black"
                />{" "}
                <span className="font-bold text-3xl">+</span>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            className="mt-6 bg-[#CC9933] text-black px-6 py-3 rounded-lg font-semibold shadow-lg hover:scale-105 hover:bg-[#b28427] transition-all"
            whileHover={{ scale: 1.05 }}
          >
            Partner With Us
          </motion.button>
        </motion.div>
        {/* vertical text with subtle animation */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          animate={{
            y: [0, -6, 0],
            opacity: [1, 0.8, 1],
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute right-6 bottom-10 uppercase font-semibold text-[var(--brand-black)]/60 tracking-[0.25em] hidden md:inline select-none transition-all hover:text-[var(--brand-gold)] hover:scale-105"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            textShadow: "0 0 8px rgba(255, 215, 0, 0.4)",
          }}
        >
          Capable
        </motion.span>
      </div>
    </>
  );
}
