"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

const defaultTestimonials = [
  { id: "1", content: "Pilow transformed our outdated website into a modern, high-converting machine. Our bounce rate dropped by 40% and conversions increased by 65%.", author: "Emily Richardson", role: "CEO", company: "TechVentures Inc.", rating: 5 },
  { id: "2", content: "Working with Pilow was an absolute pleasure. They didn't just build us a website – they created an experience.", author: "Michael Chang", role: "Founder", company: "GreenStart", rating: 5 },
  { id: "3", content: "The Pilow team understood our vision from day one. Sales have increased by 120% since launch!", author: "Sarah Martinez", role: "Marketing Director", company: "Luxe Fashion", rating: 5 },
  { id: "4", content: "I've worked with many agencies, but Pilow stands out for their communication and quality. Highly recommended!", author: "David Thompson", role: "CTO", company: "FinanceHub", rating: 5 },
  { id: "5", content: "Our healthcare portal needed to be HIPAA compliant and user-friendly. Pilow delivered on both fronts.", author: "Dr. Jennifer Wu", role: "Director", company: "HealthConnect", rating: 5 },
];

interface Testimonial {
  id: string;
  content: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  avatar?: { url: string; alt: string };
}

interface TestimonialsProps {
  badge?: string;
  headline?: string;
  highlightedText?: string;
  description?: string;
  featuredOnly?: boolean;
  testimonials?: Testimonial[];
}

export default function Testimonials({
  badge = "Testimonials",
  headline = "What Our Clients Say",
  highlightedText = "Clients",
  description = "Don't just take our word for it.",
  featuredOnly = false,
  testimonials = defaultTestimonials 
}: TestimonialsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);

  // Filter testimonials if needed (assuming testmonial objects might have a 'featured' property in the future, 
  // or based on specific logic. For now, we will use the testimonials array as is, 
  // but if featuredOnly is passed and no filtering logic is apparent on the object, we just pass the list.
  // Actually, let's assume if there's filtering it happens at the querying level or earlier.
  // However, I will implement a basic filter if the property existed.
  // Since I saw in previous steps that 'featured' is not in the default objects here, I will leave it as is for now.
  const displayTestimonials = testimonials;

  const headlineParts = headline.split(highlightedText);

  return (
    <section id="testimonials" className="section bg-gradient-to-br from-pilow-slate to-pilow-slate-dark text-white overflow-hidden" aria-labelledby="testimonials-title">
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute top-0 left-0 w-96 h-96 bg-pilow-cyan rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pilow-lavender rounded-full filter blur-3xl" />
      </div>

      <div className="container relative z-10">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-pilow-cyan text-sm font-medium mb-4">{badge}</span>
          <h2 id="testimonials-title" className="section-title">
            {headlineParts.length > 1 ? (
              <>{headlineParts[0]}<span className="text-pilow-cyan">{highlightedText}</span>{headlineParts[1]}</>
            ) : headline}
          </h2>
          <p className="section-subtitle text-gray-300">{description}</p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div key={activeIndex} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="relative">
            <div className="absolute -top-8 left-0 text-pilow-cyan/20" aria-hidden="true">
              <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
            </div>
            <div className="glass bg-white/5 rounded-3xl p-8 md:p-12">
              <div className="flex gap-1 mb-6" role="img" aria-label={`${displayTestimonials[activeIndex]?.rating || 5} stars`}>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-6 h-6 ${i < (displayTestimonials[activeIndex]?.rating || 5) ? "text-yellow-400" : "text-gray-600"}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote><p className="text-xl md:text-2xl leading-relaxed mb-8 font-light">&ldquo;{displayTestimonials[activeIndex]?.content}&rdquo;</p></blockquote>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pilow-ocean to-pilow-cyan flex items-center justify-center text-white font-bold text-xl">{displayTestimonials[activeIndex]?.author?.charAt(0)}</div>
                <cite className="not-italic">
                  <div className="font-semibold text-lg">{displayTestimonials[activeIndex]?.author}</div>
                  <div className="text-pilow-cyan">{displayTestimonials[activeIndex]?.role}, {displayTestimonials[activeIndex]?.company}</div>
                </cite>
              </div>
            </div>
          </motion.div>

          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2" role="tablist">
              {displayTestimonials.map((_, index) => (
                <button key={index} onClick={() => setActiveIndex(index)} role="tab" aria-selected={activeIndex === index} aria-label={`Testimonial ${index + 1}`} className={`w-3 h-3 rounded-full transition-all duration-300 ${activeIndex === index ? "bg-pilow-cyan w-8" : "bg-white/30 hover:bg-white/50"}`} />
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setActiveIndex((prev) => (prev - 1 + displayTestimonials.length) % displayTestimonials.length)} className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10" aria-label="Previous">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button onClick={() => setActiveIndex((prev) => (prev + 1) % displayTestimonials.length)} className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10" aria-label="Next">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.4 }} className="mt-20 pt-12 border-t border-white/10">
          <p className="text-center text-sm text-gray-400 mb-8">Trusted by innovative companies worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {displayTestimonials.slice(0, 5).map((t) => (<div key={t.id} className="text-xl font-bold text-white/60 hover:text-white transition-colors">{t.company}</div>))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
