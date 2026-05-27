"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "./LanguageSwitcher";

export interface HeaderProps {
  logo?: {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
  } | null;
  navItems?: Array<{
    link: {
      type: "reference" | "custom";
      reference?: {
        slug: string;
      } | null;
      url?: string;
      label: string;
    };
  }>;
}

const defaultNavLinks = [
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#about", label: "About" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

export default function Header({ logo, navItems }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };

    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Initialize theme from localStorage or system preference
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Sync React state with DOM state on mount
    const isDarkMode = document.documentElement.classList.contains('dark');
    if (isDarkMode) {
      // Defer state update to avoid synchronous render warning
      setTimeout(() => setIsDark(true), 0);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  const links = navItems?.map((item) => {
    let href = item.link.url || "#";
    if (item.link.type === "reference" && item.link.reference?.slug) {
      href = item.link.reference.slug === "home" ? "/" : `/${item.link.reference.slug}`;
    }
    return { href, label: item.link.label };
  }) || defaultNavLinks;



  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md py-3 shadow-lg border-b border-slate-200/50 dark:border-slate-800/50" : "py-5"
      }`}
      role="banner"
    >
      <nav
        className="container flex items-center justify-between"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 z-50"
          aria-label="Pilow - Home"
        >
          {logo?.url ? (
            <Image
              src={logo.url}
              alt={logo.alt || "Pilow Logo"}
              width={logo.width || 120}
              height={logo.height || 40}
              priority
              className="h-10 w-auto"
            />
          ) : (
            <Image
              src="/logo.png"
              alt="Pilow Logo"
              width={120}
              height={40}
              priority
              className="h-10 w-auto"
            />
          )}
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-sm font-medium text-slate-800 hover:text-pilow-ocean-dark transition-colors relative group dark:text-slate-200 dark:hover:text-cyan-400"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pilow-ocean-dark dark:bg-cyan-400 transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
          <li>
            <LanguageSwitcher />
          </li>
          <li>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-200 ${isScrolled ? 'bg-gray-100 dark:bg-gray-800' : 'bg-white/10 backdrop-blur-sm'}`}
              aria-label="Toggle Dark Mode"
            >
              {isDark ? (
                <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-pilow-slate-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </li>
          <li>
            <a href="#contact" className="btn-primary text-sm py-3 px-6">
              Get in Touch
            </a>
          </li>
        </ul>

        {/* Mobile Menu Button - Flex Container */}
        <div className="md:hidden flex items-center gap-4 z-50">
          <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-200 ${isScrolled ? 'bg-gray-100 dark:bg-gray-800' : 'bg-white/10 backdrop-blur-sm'}`}
              aria-label="Toggle Dark Mode"
            >
              {isDark ? (
                <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-pilow-slate-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          
          <button
            className="p-2 -mr-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span
                className={`w-full h-0.5 bg-pilow-slate dark:bg-white transition-all duration-300 origin-left ${
                  isMobileMenuOpen ? "rotate-45 translate-x-0.5" : ""
                }`}
              />
              <span
                className={`w-full h-0.5 bg-pilow-slate dark:bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0 translate-x-3" : ""
                }`}
              />
              <span
                className={`w-full h-0.5 bg-pilow-slate dark:bg-white transition-all duration-300 origin-left ${
                  isMobileMenuOpen ? "-rotate-45 translate-x-0.5" : ""
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-white dark:bg-[#0f1419] z-40 md:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
            >
              <motion.ul
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="flex flex-col items-center justify-center h-full gap-8"
              >
                {links.map((link, index) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <a
                      href={link.href}
                      className="text-2xl font-medium text-slate-800 dark:text-slate-200 hover:text-pilow-ocean-dark dark:hover:text-cyan-400 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <a
                    href="#contact"
                    className="btn-primary text-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get in Touch
                  </a>
                </motion.li>
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
