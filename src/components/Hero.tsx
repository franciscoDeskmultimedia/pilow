"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface HeroStat {
  value: string;
  label: string;
}

interface HeroProps {
  id?: string;
  badge?: string;
  headline?: string;
  highlightedText?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  stats?: HeroStat[];
}

const defaultProps: HeroProps = {
  badge: "Web Development Excellence",
  headline: "We Craft Digital Experiences That Inspire",
  highlightedText: "Digital Experiences",
  description: "Pilow is a premium web development agency specializing in crafting high-performance, accessible, and visually stunning digital solutions that drive business growth.",
  primaryButtonText: "Start Your Project",
  primaryButtonLink: "#contact",
  secondaryButtonText: "View Our Work",
  secondaryButtonLink: "#portfolio",
  stats: [
    { value: "150+", label: "Projects Delivered" },
    { value: "50+", label: "Happy Clients" },
    { value: "5+", label: "Years Experience" },
  ],
};

export default function Hero(props: HeroProps = {}) {
  const {
    id = "hero",
    badge = defaultProps.badge,
    headline = defaultProps.headline,
    highlightedText = defaultProps.highlightedText,
    description = defaultProps.description,
    primaryButtonText = defaultProps.primaryButtonText,
    primaryButtonLink = defaultProps.primaryButtonLink,
    secondaryButtonText = defaultProps.secondaryButtonText,
    secondaryButtonLink = defaultProps.secondaryButtonLink,
    stats = defaultProps.stats,
  } = props;

  // Split headline to add gradient text
  const headlineParts = headline?.split(highlightedText || "") || [headline];

  return (
    <section id={id} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" aria-labelledby="hero-title">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-pilow-cyan-light/30 via-transparent to-white dark:from-pilow-ocean/10 dark:to-[#0f1419]" aria-hidden="true" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center lg:text-left">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pilow-lavender/50 dark:bg-slate-800 text-pilow-slate-dark dark:text-cyan-400 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-pilow-ocean dark:bg-cyan-400 animate-pulse" />
              {badge}
            </motion.div>

            <h1 id="hero-title" className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
              {headlineParts.length > 1 ? (
                <>
                  {headlineParts[0]}
                  <span className="gradient-text">{highlightedText}</span>
                  {headlineParts[1]}
                </>
              ) : (
                headline
              )}
            </h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-lg sm:text-xl text-pilow-slate-dark dark:text-gray-300 max-w-xl mx-auto lg:mx-0 mb-8">
              {description}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href={primaryButtonLink || "#contact"} className="btn-primary">
                {primaryButtonText}
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href={secondaryButtonLink || "#portfolio"} className="btn-secondary">
                {secondaryButtonText}
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-wrap justify-center lg:justify-start gap-8 mt-12 pt-8 border-t border-pilow-lavender/50">
              {stats?.map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-pilow-slate-dark dark:text-gray-300">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div initial={{ opacity: 0, scale: 0.8, x: 50 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="relative hidden lg:block">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-pilow-ocean/20 to-pilow-cyan/30 rounded-3xl transform rotate-3" />
              <div className="absolute inset-4 bg-gradient-to-br from-pilow-lavender/40 to-pilow-cyan/20 rounded-2xl transform -rotate-2" />
              <div className="absolute inset-8 glass rounded-xl shadow-2xl overflow-hidden">
                <div className="h-full flex flex-col">
                  <div className="flex items-center gap-2 p-4 border-b border-pilow-lavender/30">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                    <div className="flex-1 mx-4">
                      <div className="bg-pilow-lavender-light rounded-full px-4 py-1 text-xs text-pilow-slate-dark text-center">pilow.dev</div>
                    </div>
                  </div>
                  <div className="flex-1 p-6 font-mono text-sm">
                    <div className="text-pilow-slate-dark"><span className="text-pilow-ocean-dark">const</span> project = {"{"}</div>
                    <div className="pl-4 text-pilow-slate-dark"><span className="text-pilow-ocean-dark">name</span>: <span className="text-green-600">&quot;Your Vision&quot;</span>,</div>
                    <div className="pl-4 text-pilow-slate-dark"><span className="text-pilow-ocean-dark">tech</span>: [<span className="text-green-600">&quot;Next.js&quot;</span>, <span className="text-green-600">&quot;React&quot;</span>],</div>
                    <div className="pl-4 text-pilow-slate-dark"><span className="text-pilow-ocean-dark">quality</span>: <span className="text-purple-600">Infinity</span>,</div>
                    <div className="text-pilow-slate-dark">{"}"}</div>
                    <div className="mt-4 text-pilow-slate-dark"><span className="text-pilow-ocean-dark">pilow</span>.<span className="text-yellow-600">build</span>(project)</div>
                  </div>
                </div>
              </div>
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute -top-4 -right-4 bg-white dark:bg-slate-800 shadow-lg rounded-xl p-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-pilow-ocean dark:bg-cyan-500 rounded-lg flex items-center justify-center text-2xl">⚡</div>
                  <div><div className="text-sm font-semibold text-pilow-slate-dark dark:text-white">Fast</div><div className="text-xs text-pilow-slate dark:text-gray-300">100% Lighthouse</div></div>
                </div>
              </motion.div>
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }} className="absolute -bottom-4 -left-4 bg-white dark:bg-slate-800 shadow-lg rounded-xl p-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-pilow-lavender dark:bg-emerald-600 rounded-lg flex items-center justify-center text-2xl">✓</div>
                  <div><div className="text-sm font-semibold text-pilow-slate-dark dark:text-white">A11y</div><div className="text-xs text-pilow-slate dark:text-gray-300">WCAG 2.1 AA</div></div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="flex flex-col items-center gap-2 text-pilow-slate">
          <span className="text-sm">Scroll to explore</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
