"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  SunIcon,
  MoonIcon,
  XMarkIcon,
  Bars3Icon,
  HomeIcon,
} from "@heroicons/react/24/solid";
import { FaChartLine } from "react-icons/fa";

export default function Header() {
  /* ------------------ Dark Mode Settings ------------------ */
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored) {
      setDarkMode(stored === "dark");
      document.documentElement.classList.toggle("dark", stored === "dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkMode(prefersDark);
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      document.documentElement.classList.toggle("dark", newMode);
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  /* ------------------ Navigation Links ------------------ */
  const navs = [
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  /* ------------------ Motion Variants ------------------ */
  const navItem: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, type: "spring", stiffness: 300, damping: 20 },
    }),
  };

  const dropdownVariants: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  return (
    <header className="sticky top-0 z-50 border-b shadow-md bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      <div className="container mx-auto flex justify-between items-center px-4 py-3 md:py-4">
        {/* ---------------------------- Logo --------------------------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200, damping: 5 }}
        >
          <Link href="/" className="flex items-center space-x-3">
            <Image
            // the logo dark here is of upper case L i hope that's the issue
              src={darkMode ? "/logoDark.png" : "/logoLight.png"}
              alt="PetrusWise Logo"
              width={140}
              height={40}
              priority
            />
          </Link>
        </motion.div>

        {/* -------------------------- Desktop Nav ----------------------- */}
        <nav aria-label="Main navigation" className="hidden md:flex">
          <ul className="flex gap-8 font-century text-sm items-center">
            {navs.map((nav, i) => (
              <motion.li
                key={nav.name}
                variants={navItem}
                initial="hidden"
                animate="visible"
                custom={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={nav.href}
                  className="relative group text-gray-800 dark:text-gray-200 font-medium focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)] rounded"
                >
                  {nav.name}
                  <span className="absolute left-0 -bottom-1 block h-[2px] w-full origin-left scale-x-0 bg-[var(--brand-gold)] transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-x-100"></span>
                </Link>
              </motion.li>
            ))}

            {/* Dashboard button styled separately with animation */}
            <motion.li
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 250 }}
            >
              <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 rounded-md font-medium bg-[var(--brand-gold)] text-[var(--brand-black)] hover:brightness-90 shadow-sm transition-all"
                >
                  <FaChartLine className="text-lg" />
                  Dashboard
                </Link>
              </motion.div>
            </motion.li>
          </ul>
        </nav>

        {/* ------------------------- Dark/Light Toggle --------------------- */}
        <motion.button
          onClick={toggleDarkMode}
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.9, rotate: -10 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="hidden md:block ml-4 p-2 rounded-lg bg-[var(--brand-gold)] text-[var(--brand-black)] hover:opacity-90 shadow focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)]"
          aria-label="Toggle Dark Mode"
        >
          <motion.div
            key={darkMode ? "sun" : "moon"}
            initial={{ rotate: 180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -180, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {darkMode ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
          </motion.div>
        </motion.button>

        {/* --------------------------- Mobile Menu --------------------- */}
        <motion.button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileHover={{
            scale: 1.1,
            rotate: 5,
            boxShadow: "0px 0px 8px rgba(255, 215, 0, 0.5)",
          }}
          whileTap={{ scale: 0.9, rotate: -5 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="relative bg-[var(--brand-gold)] text-[var(--brand-black)] p-2 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)]"
          aria-label="Toggle Mobile Menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <XMarkIcon className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <Bars3Icon className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* -------------------------- Mobile Dropdown --------------------- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="dropdown"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden bg-[var(--background)] border-b shadow-md"
          >
            <ul className="flex flex-col p-4 space-y-3 text-sm font-century">
              {navs.map((nav, i) => (
                <motion.li
                  key={nav.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={nav.href}
                    className="block relative group hover:text-[var(--brand-gold)]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {nav.name}
                    <span className="absolute left-0 -bottom-1 w-16 block h-[2px] origin-left scale-x-0 bg-[var(--brand-gold)] transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
                  </Link>
                </motion.li>
              ))}

              <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-5 py-2 bg-[var(--brand-gold)] rounded-lg text-[var(--brand-black)] font-medium text-center shadow-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                <FaChartLine className="text-lg " />

                  Dashboard
                </Link>
              </motion.li>

              <motion.li
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <button
                  onClick={toggleDarkMode}
                  className="flex items-center gap-2 p-2 rounded-lg bg-[var(--brand-gold)] text-[var(--brand-black)] hover:opacity-90 transition w-full"
                >
                  {darkMode ? (
                    <>
                      <SunIcon className="w-6 h-6" />
                      <span>Light Mode</span>
                    </>
                  ) : (
                    <>
                      <MoonIcon className="w-6 h-6" />
                      <span>Dark Mode</span>
                    </>
                  )}
                </button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
