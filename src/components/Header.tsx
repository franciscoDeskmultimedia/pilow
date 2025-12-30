"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

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
        isScrolled ? "glass py-3 shadow-lg" : "py-5"
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
              <Link
                href={link.href}
                className="text-sm font-medium text-pilow-slate hover:text-pilow-ocean transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pilow-ocean transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
          <li>
            <Link href="#contact" className="btn-primary text-sm py-3 px-6">
              Get in Touch
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden z-50 p-2 -mr-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <span
              className={`w-full h-0.5 bg-pilow-slate transition-all duration-300 origin-left ${
                isMobileMenuOpen ? "rotate-45 translate-x-0.5" : ""
              }`}
            />
            <span
              className={`w-full h-0.5 bg-pilow-slate transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0 translate-x-3" : ""
              }`}
            />
            <span
              className={`w-full h-0.5 bg-pilow-slate transition-all duration-300 origin-left ${
                isMobileMenuOpen ? "-rotate-45 translate-x-0.5" : ""
              }`}
            />
          </div>
        </button>

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
                    <Link
                      href={link.href}
                      className="text-2xl font-medium text-pilow-slate hover:text-pilow-ocean transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <Link
                    href="#contact"
                    className="btn-primary text-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get in Touch
                  </Link>
                </motion.li>
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
