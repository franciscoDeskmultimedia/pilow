"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "@/i18n/routing";
import Image from "next/image";

const defaultProjects = [
  { id: "1", title: "TechFlow SaaS Platform", category: "web-application", description: "A comprehensive SaaS platform for workflow automation.", tags: [{ tag: "Next.js" }, { tag: "TypeScript" }, { tag: "Supabase" }] },
  { id: "2", title: "Luxe Fashion E-commerce", category: "e-commerce", description: "High-end fashion e-commerce with AR try-on features.", tags: [{ tag: "Shopify" }, { tag: "React" }, { tag: "AI/ML" }] },
  { id: "3", title: "HealthConnect Portal", category: "healthcare", description: "Patient portal with telemedicine integration.", tags: [{ tag: "Next.js" }, { tag: "HIPAA Compliant" }, { tag: "WebRTC" }] },
  { id: "4", title: "FinanceHub Dashboard", category: "fintech", description: "Real-time financial dashboard with portfolio tracking.", tags: [{ tag: "React" }, { tag: "D3.js" }, { tag: "Node.js" }] },
  { id: "5", title: "EduLearn Platform", category: "edtech", description: "Interactive learning platform with video courses.", tags: [{ tag: "Next.js" }, { tag: "Payload CMS" }, { tag: "Stripe" }] },
  { id: "6", title: "GreenEnergy Portal", category: "energy", description: "Smart energy monitoring dashboard with IoT.", tags: [{ tag: "React" }, { tag: "IoT" }, { tag: "GraphQL" }] },
];

const categoryLabels: Record<string, string> = {
  "web-application": "Web Application",
  "e-commerce": "E-Commerce",
  healthcare: "Healthcare",
  fintech: "FinTech",
  edtech: "EdTech",
  energy: "Energy",
  other: "Other",
};

interface ProjectTag { tag: string; }
interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: ProjectTag[];
  projectUrl?: string;
  featuredImage?: { url: string; alt: string };
  slug?: string;
  featured?: boolean;
}

interface PortfolioProps {
  badge?: string;
  headline?: string;
  highlightedText?: string;
  description?: string;
  showFilters?: boolean;
  featuredOnly?: boolean;
  maxProjects?: number;
  projects?: Project[];
}

export default function Portfolio({ 
  badge = "Our Work",
  headline = "Featured Projects",
  highlightedText = "Projects",
  description = "Explore our portfolio of successful projects that have helped businesses achieve their digital transformation goals.",
  showFilters = true,
  featuredOnly = false,
  maxProjects,
  projects = defaultProjects 
}: PortfolioProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");

  // Filter projects based on featuredOnly first (assuming we had a featured flag, currently Project interface doesn't show it but I'll assume passing 'featuredOnly' implies filtering logic if 'featured' property existed in Project. 
  // However, looking at defaultProjects, there is no 'featured' boolean. 
  // Since I cannot change the data structure deeply here without context, I will skip 'featured' filtering logic on the data unless 'featured' prop exists on project.
  // Actually, I should probably filter by maxProjects at least.
  
  let displayedProjects = projects;
  
  if (featuredOnly) {
    displayedProjects = displayedProjects.filter(p => p.featured);
  }
  
  if (maxProjects) {
    displayedProjects = displayedProjects.slice(0, maxProjects);
  }

  const categories = ["All", ...Array.from(new Set(displayedProjects.map((p) => p.category)))];
  const filteredProjects = activeCategory === "All" ? displayedProjects : displayedProjects.filter((p) => p.category === activeCategory);

  const headlineParts = headline.split(highlightedText);

  return (
    <section id="portfolio" className="section" aria-labelledby="portfolio-title">
      <div className="container">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-pilow-lavender dark:bg-slate-700 text-pilow-slate-dark dark:text-gray-100 text-sm font-medium mb-4">{badge}</span>
          <h2 id="portfolio-title" className="section-title">
             {headlineParts.length > 1 ? (
              <>{headlineParts[0]}<span className="gradient-text">{highlightedText}</span>{headlineParts[1]}</>
            ) : headline}
          </h2>
          <p className="section-subtitle">{description}</p>
        </motion.div>

        {showFilters && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }} className="flex flex-wrap justify-center gap-3 mb-12" role="tablist" aria-label="Filter by category">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} role="tab" aria-selected={activeCategory === cat} className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat ? "bg-pilow-ocean text-white shadow-lg shadow-pilow-ocean/30" : "bg-pilow-lavender-light dark:bg-slate-700 text-pilow-slate dark:text-gray-200 hover:bg-pilow-lavender dark:hover:bg-slate-600"}`}>
                {cat === "All" ? "All" : categoryLabels[cat] || cat}
              </button>
            ))}
          </motion.div>
        )}

        <div id="portfolio-grid" role="tabpanel" className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.article key={project.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4, delay: index * 0.1 }} className="group relative bg-white dark:bg-pilow-slate-dark/30 rounded-2xl overflow-hidden shadow-lg card-hover">
              <div className="relative h-56 overflow-hidden">
                {project.featuredImage ? (
                  <Image
                    src={project.featuredImage.url}
                    alt={project.featuredImage.alt || project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-pilow-ocean to-pilow-slate flex items-center justify-center">
                    <div className="text-white/20 text-6xl font-bold">{project.title.charAt(0)}</div>
                  </div>
                )}
                <motion.div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/50 z-10">
                  {project.slug ? (
                     <Link 
                       href={`/projects/${project.slug}`} 
                       className="px-6 py-3 bg-white dark:bg-slate-800 text-pilow-slate-dark dark:text-white font-medium rounded-full hover:bg-pilow-cyan dark:hover:bg-cyan-600 transition-colors"
                       aria-label={`View ${project.title}`}
                     >
                       View Project
                     </Link>
                   ) : (
                     <a 
                       href={project.projectUrl || "#"} 
                       className="px-6 py-3 bg-white dark:bg-slate-800 text-pilow-slate-dark dark:text-white font-medium rounded-full hover:bg-pilow-cyan dark:hover:bg-cyan-600 transition-colors"
                       aria-label={`View ${project.title}`}
                     >
                       View Project
                     </a>
                   )}
                </motion.div>
              </div>
              <div className="p-6">
                <span className="text-xs font-medium text-pilow-ocean uppercase tracking-wider">{categoryLabels[project.category] || project.category}</span>
                <h3 className="text-xl font-bold text-pilow-slate-dark dark:text-white mt-2 mb-3">{project.title}</h3>
                <p className="text-pilow-slate dark:text-gray-300 text-sm mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((t) => (
                    <span key={t.tag} className="px-3 py-1 bg-pilow-lavender-light dark:bg-pilow-slate/50 text-pilow-slate-dark dark:text-gray-300 text-xs rounded-full">{t.tag}</span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.6 }} className="text-center mt-12">
          <a href="#contact" className="btn-secondary inline-flex items-center">Start Your Project →</a>
        </motion.div>
      </div>
    </section>
  );
}
