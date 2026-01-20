"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, FormEvent } from "react";

interface ContactProps {
  badge?: string;
  headline?: string;
  highlightedText?: string;
  description?: string;
  formTitle?: string;
  formDescription?: string;
  showContactInfo?: boolean;
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
    socialLinks?: { platform: string; url: string }[];
  };
}

export default function Contact({
  badge = "Get in Touch",
  headline = "Ready to Start Your Project?",
  highlightedText = "Project",
  description = "Let's discuss how we can help bring your vision to life.",
  formTitle = "Let's Build Something Amazing",
  formDescription,
  showContactInfo = true,
  contactInfo,
}: ContactProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const headlineParts = headline.split(highlightedText);

  return (
    <section id="contact" className="section bg-gradient-to-b from-white to-pilow-lavender-light dark:from-[#0f1419] dark:to-pilow-slate-dark/20" aria-labelledby="contact-title">
      <div className="container">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-pilow-ocean/10 text-pilow-ocean text-sm font-medium mb-4">{badge}</span>
          <h2 id="contact-title" className="section-title">
            {headlineParts.length > 1 ? (
              <>{headlineParts[0]}<span className="gradient-text">{highlightedText}</span>{headlineParts[1]}</>
            ) : headline}
          </h2>
          <p className="section-subtitle">{description}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
            {isSubmitted ? (
              <div className="bg-white dark:bg-pilow-slate-dark/50 rounded-2xl p-8 shadow-lg text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-pilow-slate-dark dark:text-white mb-2">Thank You!</h3>
                <p className="text-pilow-slate dark:text-gray-300">We&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white dark:bg-pilow-slate-dark/50 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-pilow-slate-dark dark:text-white mb-2">{formTitle}</h3>
                {formDescription && <p className="text-pilow-slate dark:text-gray-300 mb-6">{formDescription}</p>}
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-pilow-slate-dark dark:text-white mb-2">Name *</label>
                    <input type="text" id="name" name="name" required className="w-full px-4 py-3 rounded-xl border border-pilow-lavender focus:border-pilow-ocean focus:ring-2 focus:ring-pilow-ocean/20 transition-colors dark:bg-pilow-slate dark:border-pilow-slate dark:text-white" placeholder="Your name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-pilow-slate-dark dark:text-white mb-2">Email *</label>
                    <input type="email" id="email" name="email" required className="w-full px-4 py-3 rounded-xl border border-pilow-lavender focus:border-pilow-ocean focus:ring-2 focus:ring-pilow-ocean/20 transition-colors dark:bg-pilow-slate dark:border-pilow-slate dark:text-white" placeholder="your@email.com" />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="company" className="block text-sm font-medium text-pilow-slate-dark dark:text-white mb-2">Company</label>
                  <input type="text" id="company" name="company" className="w-full px-4 py-3 rounded-xl border border-pilow-lavender focus:border-pilow-ocean focus:ring-2 focus:ring-pilow-ocean/20 transition-colors dark:bg-pilow-slate dark:border-pilow-slate dark:text-white" placeholder="Your company" />
                </div>
                <div className="mb-4">
                  <label htmlFor="budget" className="block text-sm font-medium text-pilow-slate-dark dark:text-white mb-2">Budget Range</label>
                  <select id="budget" name="budget" className="w-full px-4 py-3 rounded-xl border border-pilow-lavender focus:border-pilow-ocean focus:ring-2 focus:ring-pilow-ocean/20 transition-colors dark:bg-pilow-slate dark:border-pilow-slate dark:text-white">
                    <option value="">Select budget</option>
                    <option value="5k-10k">$5,000 - $10,000</option>
                    <option value="10k-25k">$10,000 - $25,000</option>
                    <option value="25k-50k">$25,000 - $50,000</option>
                    <option value="50k+">$50,000+</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-pilow-slate-dark dark:text-white mb-2">Project Details *</label>
                  <textarea id="message" name="message" required rows={4} className="w-full px-4 py-3 rounded-xl border border-pilow-lavender focus:border-pilow-ocean focus:ring-2 focus:ring-pilow-ocean/20 transition-colors resize-none dark:bg-pilow-slate dark:border-pilow-slate dark:text-white" placeholder="Tell us about your project..." />
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full btn-primary justify-center disabled:opacity-50">
                  {isSubmitting ? (
                    <><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Sending...</>
                  ) : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>

          {showContactInfo && (
            <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }} className="space-y-8">
              <div className="bg-gradient-to-br from-pilow-ocean to-pilow-slate rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  {contactInfo?.email && (
                    <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-4 hover:text-pilow-cyan transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">📧</div>
                      <div><div className="text-sm text-white/60">Email</div><div className="font-medium">{contactInfo.email}</div></div>
                    </a>
                  )}
                  {contactInfo?.phone && (
                    <a href={`tel:${contactInfo.phone.replace(/[^0-9+]/g, '')}`} className="flex items-center gap-4 hover:text-pilow-cyan transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">📞</div>
                      <div><div className="text-sm text-white/60">Phone</div><div className="font-medium">{contactInfo.phone}</div></div>
                    </a>
                  )}
                  {contactInfo?.address && (
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">📍</div>
                      <div><div className="text-sm text-white/60">Location</div><div className="font-medium">{contactInfo.address}</div></div>
                    </div>
                  )}
                </div>
                {contactInfo?.socialLinks && contactInfo.socialLinks.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-white/20">
                    <p className="text-sm text-white/60 mb-4">Follow us</p>
                    <div className="flex gap-3">
                      {contactInfo.socialLinks.map((link, i) => (
                        <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-sm font-medium hover:bg-white/20 transition-colors">
                          {link.platform.substring(0, 2).toUpperCase()}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
