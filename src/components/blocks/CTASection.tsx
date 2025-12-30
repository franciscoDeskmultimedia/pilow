"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

interface CTASectionProps {
  headline: string;
  description?: string;
  button?: { text: string; link: string };
  style?: string;
}

export default function CTASection({ headline, description, button, style = "banner" }: CTASectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (style === "card") {
    return (
      <section className="section">
        <div className="container">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto bg-gradient-to-br from-pilow-ocean to-pilow-slate rounded-3xl p-12 text-center text-white"
          >
            <h2 className="text-3xl font-bold mb-4">{headline}</h2>
            {description && <p className="text-white/80 mb-8">{description}</p>}
            {button && (
              <Link href={button.link || "#"} className="btn-primary bg-white text-pilow-slate-dark hover:bg-pilow-cyan">
                {button.text} →
              </Link>
            )}
          </motion.div>
        </div>
      </section>
    );
  }

  // Default: banner style
  return (
    <section className="bg-gradient-to-r from-pilow-ocean to-pilow-slate py-16">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-8 text-white"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">{headline}</h2>
            {description && <p className="text-white/80 text-lg">{description}</p>}
          </div>
          {button && (
            <Link href={button.link || "#"} className="btn-primary bg-white text-pilow-slate-dark hover:bg-pilow-cyan flex-shrink-0">
              {button.text} →
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  );
}
