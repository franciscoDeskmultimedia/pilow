"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

// Icon components map
const iconMap: Record<string, React.ReactNode> = {
  code: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  palette: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  ),
  cart: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  ),
  computer: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  mobile: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  lightning: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  database: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
    </svg>
  ),
  cloud: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>
  ),
};

// Default services for when CMS data is not available
const defaultServices = [
  { id: "1", title: "Web Development", description: "High-performance web applications using Next.js, React, and TypeScript.", icon: "code", features: [{ feature: "Next.js & React" }, { feature: "TypeScript" }, { feature: "Performance Optimized" }, { feature: "SEO Ready" }] },
  { id: "2", title: "UI/UX Design", description: "Beautiful, intuitive interfaces that delight users and drive conversions.", icon: "palette", features: [{ feature: "User Research" }, { feature: "Wireframing" }, { feature: "Prototyping" }, { feature: "Design Systems" }] },
  { id: "3", title: "E-Commerce Solutions", description: "End-to-end e-commerce that drives sales. Fast, secure, and conversion-optimized.", icon: "cart", features: [{ feature: "Shopify & WooCommerce" }, { feature: "Custom Carts" }, { feature: "Payment Integration" }, { feature: "Analytics" }] },
  { id: "4", title: "CMS Development", description: "Flexible content management with headless CMS solutions like Payload and Sanity.", icon: "computer", features: [{ feature: "Headless CMS" }, { feature: "Payload & Sanity" }, { feature: "Content Modeling" }, { feature: "API Integration" }] },
  { id: "5", title: "Mobile-First Design", description: "Responsive designs that look stunning on every device.", icon: "mobile", features: [{ feature: "Responsive Design" }, { feature: "PWA Support" }, { feature: "Touch Optimized" }, { feature: "Cross-Browser" }] },
  { id: "6", title: "Performance Optimization", description: "Lightning-fast websites that rank higher and convert better.", icon: "lightning", features: [{ feature: "Core Web Vitals" }, { feature: "Image Optimization" }, { feature: "Code Splitting" }, { feature: "CDN Setup" }] },
];

interface ServiceFeature {
  feature: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: ServiceFeature[];
}

interface ServicesProps {
  id?: string;
  badge?: string;
  headline?: string;
  highlightedText?: string;
  description?: string;
  services?: Service[];
}

export default function Services({ 
  id = "services",
  badge = "What We Do",
  headline = "Services That Drive Results",
  highlightedText = "Results",
  description = "From concept to deployment, we offer comprehensive web development services tailored to your unique business needs.",
  services = defaultServices 
}: ServicesProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const headlineParts = headline.split(highlightedText);

  return (
    <section id={id} className="section bg-gradient-to-b from-white to-pilow-lavender-light dark:from-[#0f1419] dark:to-pilow-slate-dark/20" aria-labelledby="services-title">
      <div className="container">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-pilow-ocean/10 text-pilow-ocean text-sm font-medium mb-4">{badge}</span>
          <h2 id="services-title" className="section-title">
            {headlineParts.length > 1 ? (
              <>{headlineParts[0]}<span className="gradient-text">{highlightedText}</span>{headlineParts[1]}</>
            ) : headline}
          </h2>
          <p className="section-subtitle">{description}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.article key={service.id} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: index * 0.1 }} className="group relative bg-white dark:bg-pilow-slate-dark/30 rounded-2xl p-8 shadow-lg card-hover border border-transparent hover:border-pilow-ocean/20">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-pilow-ocean to-pilow-ocean-dark flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                {iconMap[service.icon] || iconMap.code}
              </div>
              <h3 className="text-xl font-bold text-pilow-slate-dark dark:text-white mb-3">{service.title}</h3>
              <p className="text-pilow-slate dark:text-gray-300 mb-6 leading-relaxed">{service.description}</p>
              <ul className="space-y-2" role="list">
                {service.features.map((f) => (
                  <li key={f.feature} className="flex items-center gap-2 text-sm text-pilow-slate dark:text-gray-400">
                    <svg className="w-4 h-4 text-pilow-ocean flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {f.feature}
                  </li>
                ))}
              </ul>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pilow-ocean/5 to-pilow-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" aria-hidden="true" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
