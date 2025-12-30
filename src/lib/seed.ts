
import { Payload } from 'payload'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const defaultProjects = [
  { title: "TechFlow SaaS Platform", category: "web-application", description: "A comprehensive SaaS platform for workflow automation.", tags: [{ tag: "Next.js" }, { tag: "TypeScript" }, { tag: "Supabase" }], featured: true },
  { title: "Luxe Fashion E-commerce", category: "e-commerce", description: "High-end fashion e-commerce with AR try-on features.", tags: [{ tag: "Shopify" }, { tag: "React" }, { tag: "AI/ML" }], featured: true  },
  { title: "HealthConnect Portal", category: "healthcare", description: "Patient portal with telemedicine integration.", tags: [{ tag: "Next.js" }, { tag: "HIPAA Compliant" }, { tag: "WebRTC" }], featured: true  },
  { title: "FinanceHub Dashboard", category: "fintech", description: "Real-time financial dashboard with portfolio tracking.", tags: [{ tag: "React" }, { tag: "D3.js" }, { tag: "Node.js" }], featured: true  },
  { title: "EduLearn Platform", category: "edtech", description: "Interactive learning platform with video courses.", tags: [{ tag: "Next.js" }, { tag: "Payload CMS" }, { tag: "Stripe" }], featured: true  },
  { title: "GreenEnergy Portal", category: "energy", description: "Smart energy monitoring dashboard with IoT.", tags: [{ tag: "React" }, { tag: "IoT" }, { tag: "GraphQL" }], featured: true  },
];

const defaultTestimonials = [
  { content: "Pilow transformed our outdated website into a modern, high-converting machine. Our bounce rate dropped by 40% and conversions increased by 65%.", author: "Emily Richardson", role: "CEO", company: "TechVentures Inc.", rating: 5, featured: true },
  { content: "Working with Pilow was an absolute pleasure. They didn't just build us a website – they created an experience.", author: "Michael Chang", role: "Founder", company: "GreenStart", rating: 5, featured: true },
  { content: "The Pilow team understood our vision from day one. Sales have increased by 120% since launch!", author: "Sarah Martinez", role: "Marketing Director", company: "Luxe Fashion", rating: 5, featured: true },
  { content: "I've worked with many agencies, but Pilow stands out for their communication and quality. Highly recommended!", author: "David Thompson", role: "CTO", company: "FinanceHub", rating: 5, featured: true },
  { content: "Our healthcare portal needed to be HIPAA compliant and user-friendly. Pilow delivered on both fronts.", author: "Dr. Jennifer Wu", role: "Director", company: "HealthConnect", rating: 5, featured: true },
];

const defaultServices = [
  { title: "Web Development", description: "High-performance web applications using Next.js, React, and TypeScript.", icon: "code", features: [{ feature: "Next.js & React" }, { feature: "TypeScript" }, { feature: "Performance Optimized" }, { feature: "SEO Ready" }] },
  { title: "UI/UX Design", description: "Beautiful, intuitive interfaces that delight users and drive conversions.", icon: "palette", features: [{ feature: "User Research" }, { feature: "Wireframing" }, { feature: "Prototyping" }, { feature: "Design Systems" }] },
  { title: "E-Commerce Solutions", description: "End-to-end e-commerce that drives sales. Fast, secure, and conversion-optimized.", icon: "cart", features: [{ feature: "Shopify & WooCommerce" }, { feature: "Custom Carts" }, { feature: "Payment Integration" }, { feature: "Analytics" }] },
  { title: "CMS Development", description: "Flexible content management with headless CMS solutions like Payload and Sanity.", icon: "computer", features: [{ feature: "Headless CMS" }, { feature: "Payload & Sanity" }, { feature: "Content Modeling" }, { feature: "API Integration" }] },
  { title: "Mobile-First Design", description: "Responsive designs that look stunning on every device.", icon: "mobile", features: [{ feature: "Responsive Design" }, { feature: "PWA Support" }, { feature: "Touch Optimized" }, { feature: "Cross-Browser" }] },
  { title: "Performance Optimization", description: "Lightning-fast websites that rank higher and convert better.", icon: "lightning", features: [{ feature: "Core Web Vitals" }, { feature: "Image Optimization" }, { feature: "Code Splitting" }, { feature: "CDN Setup" }] },
];

const heroData = {
  badge: "Web Development Excellence",
  headline: "We Craft Digital Experiences That Inspire",
  highlightedText: "Digital Experiences",
  description: "Pilow is a premium web development agency specializing in crafting high-performance, accessible, and visually stunning digital solutions that drive business growth.",
  primaryButton: { text: "Start Your Project", link: "#contact" },
  secondaryButton: { text: "View Our Work", link: "#portfolio" },
  stats: [
    { value: "150+", label: "Projects Delivered" },
    { value: "50+", label: "Happy Clients" },
    { value: "5+", label: "Years Experience" },
  ],
  showCodePreview: true,
};

const aboutData = {
  badge: "About Us",
  headline: "Passionate About Building the Future of Web",
  highlightedText: "Future of Web",
  values: [
    { title: "Innovation First", description: "We stay ahead of the curve, always exploring new technologies.", icon: "lightbulb" },
    { title: "Collaboration", description: "We work as partners with our clients, not just service providers.", icon: "users" },
    { title: "Quality Obsessed", description: "Every pixel, every line of code is crafted with attention to detail.", icon: "badge" },
    { title: "Performance Driven", description: "Speed and efficiency are at the core of everything we build.", icon: "lightning" },
  ],
  stats: [
    { value: "150+", label: "Projects Completed" },
    { value: "50+", label: "Happy Clients" },
    { value: "99%", label: "Client Satisfaction" },
    { value: "24/7", label: "Support Available" },
  ],
};

export async function seed(payload: Payload) {
  console.log('--- Seeding content ---')

  // 1. Upload Logo & Placeholder
  let logoId;
  let placeholderId;
  const logoPath = path.resolve(dirname, '../../public/logo.png');
  // Use logo as placeholder for now if no other image
  
  try {
      // Check if media already exists (basic check)
      const existingMedia = await payload.find({ collection: 'media', limit: 5 });
      if (existingMedia.docs.length > 0) {
          // just pick the first one or look for specific ones
          logoId = existingMedia.docs.find(d => d.alt === 'Pilow Logo')?.id || existingMedia.docs[0].id;
          placeholderId = logoId; 
      } else if (fs.existsSync(logoPath)) {
        const fileData = fs.readFileSync(logoPath);
        const media = await payload.create({
            collection: 'media',
            data: {
                alt: 'Pilow Logo',
            },
            file: {
                data: fileData,
                name: 'logo.png',
                mimetype: 'image/png',
                size: fileData.length,
            }
        });
        logoId = media.id;
        placeholderId = media.id;
        console.log(`Uploaded logo, ID: ${logoId}`);
      } else {
        console.warn('Logo file not found at public/logo.png, skipping logo upload.');
      }
  } catch (e) {
      console.error('Error uploading logo:', e);
  }

  // 2. Seed Projects
  if (placeholderId) {
    for (const project of defaultProjects) {
        const existing = await payload.find({
            collection: 'projects',
            where: { title: { equals: project.title } }
        });
        
        if (existing.docs.length === 0) {
            // Generate a simple slug
            const slug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
            
            await payload.create({
                collection: 'projects',
                data: {
                    ...project,
                    slug,
                    featuredImage: placeholderId,
                    gallery: [{ image: placeholderId }],
                },
            });
            console.log(`Created project: ${project.title}`);
        }
    }
  } else {
      console.warn('Skipping projects seed: No placeholder image available for required featuredImage field.');
  }

  // 3. Seed Testimonials
  for (const testimonial of defaultTestimonials) {
    const existing = await payload.find({
        collection: 'testimonials',
        where: { author: { equals: testimonial.author } }
    });
    
    if (existing.docs.length === 0) {
        await payload.create({
            collection: 'testimonials',
            data: {
                ...testimonial,
                // Avatar is optional in schema, so we can omit if we don't have one, or use placeholderId if we want
            },
        });
        console.log(`Created testimonial: ${testimonial.author}`);
    }
  }

  // 4. Seed Homepage
  const existingHome = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'home' } }
  });

  if (existingHome.docs.length === 0) {
      await payload.create({
          collection: 'pages',
          data: {
              title: 'Home',
              slug: 'home',
              isHomepage: true,
              status: 'published',
              layout: [
                  {
                      blockType: 'hero',
                      ...heroData,
                  },
                  {
                      blockType: 'services',
                      source: 'custom',
                      customServices: defaultServices,
                      badge: "What We Do",
                      headline: "Services That Drive Results",
                      highlightedText: "Results",
                  },
                  {
                      blockType: 'portfolio',
                      showFilters: true,
                      featuredOnly: true,
                      maxItems: 6,
                      badge: "Our Work",
                      headline: "Featured Projects",
                      highlightedText: "Projects",
                  },
                  {
                      blockType: 'about',
                      ...aboutData,
                  },
                  {
                      blockType: 'testimonials',
                      source: 'collection',
                      featuredOnly: true,
                      badge: "Testimonials",
                      headline: "What Our Clients Say",
                      highlightedText: "Clients",
                  },
                  {
                      blockType: 'contact',
                      badge: "Get in Touch",
                      headline: "Ready to Start Your Project?",
                      highlightedText: "Project",
                      formTitle: "Let's Build Something Amazing",
                      showContactInfo: true,
                  }
              ]
          }
      });
      console.log('Created Homepage');
  } else {
      console.log('Homepage already exists, skipping creation.');
  }

  // 5. Seed Globals
  if (logoId) {
    // Check if Header is already set up to avoid overwriting user changes?
    // We'll just update if it looks empty or if we want to enforce defaults
    const header = await payload.findGlobal({ slug: 'header' });
    if (!header.logo) {
      await payload.updateGlobal({
          slug: 'header',
          data: {
              logo: logoId,
              navItems: [
                  { link: { type: 'custom', url: '#services', label: 'Services' } },
                  { link: { type: 'custom', url: '#portfolio', label: 'Portfolio' } },
                  { link: { type: 'custom', url: '#about', label: 'About' } },
                  { link: { type: 'custom', url: '#testimonials', label: 'Testimonials' } },
                  { link: { type: 'custom', url: '#contact', label: 'Contact' } },
              ]
          }
      });
      console.log('Updated Header Global');
    }

    const footer = await payload.findGlobal({ slug: 'footer' });
    if (!footer.logo) {
      await payload.updateGlobal({
        slug: 'footer',
        data: {
            logo: logoId,
            copyright: 'Pilow. All rights reserved.',
            socialLinks: [
                { platform: 'twitter', url: '#' },
                { platform: 'linkedin', url: '#' },
                { platform: 'github', url: '#' },
                { platform: 'instagram', url: '#' },
            ]
        }
      });
      console.log('Updated Footer Global');
    }
  }

  console.log('--- Seed complete ---')
}
