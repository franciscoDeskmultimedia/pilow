"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface ContentSectionProps {
  heading?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content?: any;
  backgroundColor?: string;
}

export default function ContentSection({ heading, content, backgroundColor = "white" }: ContentSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const bgClasses = {
    white: "bg-white dark:bg-[#0f1419]",
    gray: "bg-pilow-lavender-light dark:bg-pilow-slate-dark/20",
    gradient: "bg-gradient-to-br from-pilow-ocean to-pilow-slate text-white",
  };

  return (
    <section className={`section ${bgClasses[backgroundColor as keyof typeof bgClasses] || bgClasses.white}`}>
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {heading && (
            <h2 className="section-title text-center mb-8">{heading}</h2>
          )}
          {content && (
            <div className="prose prose-lg dark:prose-invert mx-auto">
              {/* Render rich text content - simplified for now */}
              {typeof content === "string" ? (
                <p>{content}</p>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: String(content) }} />
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
