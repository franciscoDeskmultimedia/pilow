"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const iconMap: Record<string, string> = {
  lightbulb: "💡",
  users: "👥",
  badge: "✓",
  lightning: "⚡",
};

const defaultValues = [
  { title: "Innovation First", description: "We stay ahead of the curve, always exploring new technologies.", icon: "lightbulb" },
  { title: "Collaboration", description: "We work as partners with our clients, not just service providers.", icon: "users" },
  { title: "Quality Obsessed", description: "Every pixel, every line of code is crafted with attention to detail.", icon: "badge" },
  { title: "Performance Driven", description: "Speed and efficiency are at the core of everything we build.", icon: "lightning" },
];

const defaultStats = [
  { value: "150+", label: "Projects Completed" },
  { value: "50+", label: "Happy Clients" },
  { value: "99%", label: "Client Satisfaction" },
  { value: "24/7", label: "Support Available" },
];

interface AboutValue { title: string; description: string; icon?: string; }
interface AboutStat { value: string; label: string; }

interface AboutProps {
  badge?: string;
  headline?: string;
  highlightedText?: string;
  values?: AboutValue[];
  stats?: AboutStat[];
}

export default function About({
  badge = "About Us",
  headline = "Passionate About Building the Future of Web",
  highlightedText = "Future of Web",
  values = defaultValues,
  stats = defaultStats,
}: AboutProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const headlineParts = headline.split(highlightedText);

  return (
    <section id="about" className="section bg-gradient-to-b from-pilow-lavender-light to-white dark:from-pilow-slate-dark/20 dark:to-[#0f1419]" aria-labelledby="about-title">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div ref={ref} initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-2 rounded-full bg-pilow-cyan/30 text-pilow-ocean-dark text-sm font-medium mb-4">{badge}</span>
            <h2 id="about-title" className="section-title text-left">
              {headlineParts.length > 1 ? (
                <>{headlineParts[0]}<span className="gradient-text">{highlightedText}</span>{headlineParts[1]}</>
              ) : headline}
            </h2>
            <p className="text-lg text-pilow-slate dark:text-gray-300 mb-6 leading-relaxed">
              Pilow was founded with a simple mission: to help businesses succeed in the digital world through exceptional web development.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <motion.div key={value.title} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-pilow-ocean/10 flex items-center justify-center text-2xl">
                    {iconMap[value.icon || "lightbulb"] || "💡"}
                  </div>
                  <div>
                    <h3 className="font-semibold text-pilow-slate-dark dark:text-white mb-1">{value.title}</h3>
                    <p className="text-sm text-pilow-slate dark:text-gray-400">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-pilow-ocean/20 to-pilow-cyan/20 rounded-3xl transform rotate-2" aria-hidden="true" />
              <div className="absolute -inset-4 bg-gradient-to-tr from-pilow-lavender/40 to-pilow-cyan/20 rounded-3xl transform -rotate-2" aria-hidden="true" />
              <div className="relative bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-xl">
                <div className="grid grid-cols-2 gap-8 mb-8">
                  {stats.map((stat, index) => (
                    <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.8 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }} className="text-center p-4 bg-pilow-lavender-light dark:bg-slate-800 rounded-xl">
                      <div className="text-3xl font-bold text-pilow-ocean dark:text-cyan-400">{stat.value}</div>
                      <div className="text-sm text-pilow-slate dark:text-gray-300 mt-1">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
                <div className="border-t border-pilow-lavender/50 pt-8">
                  <h3 className="text-lg font-semibold text-pilow-slate-dark dark:text-white mb-4">Meet Our Team</h3>
                  <div className="flex -space-x-3">
                    {["A", "S", "M"].map((initial, index) => (
                      <motion.div key={initial} initial={{ opacity: 0, x: -10 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }} className="w-14 h-14 rounded-full bg-gradient-to-br from-pilow-ocean to-pilow-slate flex items-center justify-center text-white font-bold text-lg ring-4 ring-white dark:ring-pilow-slate-dark">
                        {initial}
                      </motion.div>
                    ))}
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.3, delay: 0.9 }} className="w-14 h-14 rounded-full bg-pilow-lavender dark:bg-slate-600 flex items-center justify-center text-pilow-slate-dark dark:text-white font-medium text-sm ring-4 ring-white dark:ring-slate-900">
                      +10
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
