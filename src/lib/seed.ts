
import { Payload } from 'payload'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const generateRichText = (text: string) => ({
  root: {
    type: "root",
    children: [
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: text,
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        textFormat: 0,
        version: 1,
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    version: 1,
  },
});

const defaultProjects = [
  { 
    title: "TechFlow SaaS Platform", 
    category: "web-application", 
    description: "A comprehensive SaaS platform for workflow automation, featuring real-time collaboration and analytics.", 
    fullDescription: generateRichText("TechFlow is a cutting-edge SaaS platform designed to streamline enterprise workflows. Built with Next.js and Supabase, it offers real-time collaboration features, advanced analytics dashboards, and seamless integration with third-party tools. The platform handles over 100k daily active users with sub-second latency."),
    tags: [{ tag: "Next.js" }, { tag: "TypeScript" }, { tag: "Supabase" }, { tag: "Tailwind" }], 
    imageFile: "project-saas.jpg",
    featured: true 
  },
  { 
    title: "Luxe Fashion E-commerce", 
    category: "e-commerce", 
    description: "High-end fashion e-commerce experience with AR try-on features and AI-powered recommendations.", 
    fullDescription: generateRichText("We redefined the online luxury shopping experience for Luxe Fashion. The platform features 3D product visualization, AR virtual try-on, and an AI styling assistant. The headless Shopify architecture allows for blazing fast page loads and a completely custom frontend experience."),
    tags: [{ tag: "Shopify Plus" }, { tag: "React" }, { tag: "Three.js" }, { tag: "AI/ML" }], 
    imageFile: "project-ecommerce.jpg",
    featured: true  
  },
  { 
    title: "HealthConnect Portal", 
    category: "healthcare", 
    description: "Secure patient portal with telemedicine integration and HIPAA-compliant data handling.", 
    fullDescription: generateRichText("HealthConnect connects patients with healthcare providers securely and efficiently. Key features include encrypted video consultations, secure document sharing, and real-time appointment scheduling. The system is fully HIPAA compliant and audits have shown 99.99% uptime."),
    tags: [{ tag: "Next.js" }, { tag: "HIPAA Compliant" }, { tag: "WebRTC" }, { tag: "PostgreSQL" }], 
    imageFile: "project-health.jpg",
    featured: true  
  },
  { 
    title: "FinanceHub Dashboard", 
    category: "fintech", 
    description: "Real-time financial dashboard with advanced portfolio tracking and predictive modeling.", 
    fullDescription: generateRichText("Values billions of dollars in transactions daily, FinanceHub needed a robust and accurate visualization layer. We built a high-performance dashboard using D3.js and React that processes market data in real-time, providing traders with the split-second information they need."),
    tags: [{ tag: "React" }, { tag: "D3.js" }, { tag: "Node.js" }, { tag: "Redis" }], 
    imageFile: "project-fintech.jpg",
    featured: true  
  },
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
  const logoPath = path.resolve(dirname, '../../public/logo.png');
  
  try {
      const existingLogo = await payload.find({ collection: 'media', where: { alt: { equals: 'Pilow Logo' } } });
      if (existingLogo.docs.length > 0) {
          logoId = existingLogo.docs[0].id;
      } else if (fs.existsSync(logoPath)) {
        const fileData = fs.readFileSync(logoPath);
        const media = await payload.create({
            collection: 'media',
            data: { alt: 'Pilow Logo' },
            file: {
                data: fileData,
                name: 'logo.png',
                mimetype: 'image/png',
                size: fileData.length,
            }
        });
        logoId = media.id;
        console.log(`Uploaded logo, ID: ${logoId}`);
      }
  } catch (e) {
      console.error('Error uploading logo:', e);
  }

  // 2. Seed Projects with specific images
  for (const project of defaultProjects) {
    const existing = await payload.find({
        collection: 'projects',
        where: { title: { equals: project.title } }
    });
    
    if (existing.docs.length === 0) {
        // Upload image for project
        let imageId = logoId; // fallback
        const imagePath = path.resolve(dirname, `../../public/seed-images/${project.imageFile}`);
        
        if (fs.existsSync(imagePath)) {
            try {
                // Check if image already exists to avoid dupes
                const existingImg = await payload.find({ collection: 'media', where: { alt: { equals: project.title } } });
                if (existingImg.docs.length > 0) {
                    imageId = existingImg.docs[0].id;
                } else {
                    const fileData = fs.readFileSync(imagePath);
                    const media = await payload.create({
                        collection: 'media',
                        data: { alt: project.title },
                        file: {
                            data: fileData,
                            name: project.imageFile,
                            mimetype: 'image/jpeg',
                            size: fileData.length,
                        }
                    });
                    imageId = media.id;
                    console.log(`Uploaded image for ${project.title}`);
                }
            } catch (e) {
                console.error(`Error uploading image for ${project.title}:`, e);
            }
        } else {
            console.warn(`Image not found: ${imagePath}, using logo as fallback`);
        }

        const slug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        
        // Check if project with this slug already exists
        const existingProject = await payload.find({
            collection: 'projects',
            where: { slug: { equals: slug } },
            locale: 'en',
        });
        
        if (existingProject.docs.length > 0) {
            const doc = existingProject.docs[0];
            // Update existing project to ensure English content exists
            if (!doc.title) {
                 const { imageFile: _, ...projectData } = project; // eslint-disable-line @typescript-eslint/no-unused-vars
                 await payload.update({
                    collection: 'projects',
                    id: doc.id,
                    data: {
                        ...projectData,
                        _status: 'published',
                    },
                    locale: 'en',
                });
                console.log(`Updated project content: ${project.title}`);
            } else {
                console.log(`Project already exists: ${project.title}`);
            }
            continue;
        }
        
        // Remove imageFile from spread
        const { imageFile: _, ...projectData } = project; // eslint-disable-line @typescript-eslint/no-unused-vars

        await payload.create({
            collection: 'projects',
            locale: 'en', // Create in English locale
            data: {
                ...projectData,
                slug,
                featuredImage: imageId,
                gallery: [{ image: imageId }, { image: imageId }], // Reuse for gallery for now
                _status: 'published', // Ensure projects are published
            },
        });
        console.log(`Created project: ${project.title}`);
    }
  }

  // 3. Seed Testimonials
  for (const testimonial of defaultTestimonials) {
    const existing = await payload.find({
        collection: 'testimonials',
        where: { author: { equals: testimonial.author } },
        locale: 'en',
    });
    
    if (existing.docs.length === 0) {
        await payload.create({
            collection: 'testimonials',
            data: { ...testimonial },
            locale: 'en',
        });
        console.log(`Created testimonial: ${testimonial.author}`);
    } else {
        // Update existing testimonial to ensure English content exists
        const doc = existing.docs[0];
        if (!doc.content) {
            await payload.update({
                collection: 'testimonials',
                id: doc.id,
                data: { ...testimonial },
                locale: 'en',
            });
            console.log(`Updated testimonial content: ${testimonial.author}`);
        }
    }
  }

  // 4. Seed Homepage
  const existingHome = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'home' } },
      locale: 'en',
  });

  const homePageData = {
      title: 'Home',
      slug: 'home',
      isHomepage: true,
      status: 'published',
      layout: [
          { blockType: 'hero', ...heroData },
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
          { blockType: 'about', ...aboutData },
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
  };

  if (existingHome.docs.length === 0) {
      await payload.create({
          collection: 'pages',
          data: homePageData,
          locale: 'en',
      });
      console.log('Created Homepage');
  } else {
      // Check if layout is empty/broken and repair it
      const home = existingHome.docs[0];
      if (!home.layout || (Array.isArray(home.layout) && home.layout.length === 0)) {
          console.log('Reparing broken homepage layout...');
          await payload.update({
              collection: 'pages',
              id: home.id,
              data: homePageData,
              locale: 'en',
          });
          console.log('Homepage repaired');
      }
  }

  // 5. Seed Globals
  if (logoId) {
    const header = await payload.findGlobal({ slug: 'header' });
    if (!header.logo) {
      await payload.updateGlobal({
          slug: 'header',
          data: {
              logo: logoId,
              navItems: [
                  { link: { type: 'custom', url: '/#services', label: 'Services' } },
                  { link: { type: 'custom', url: '/#portfolio', label: 'Portfolio' } },
                  { link: { type: 'custom', url: '/#about', label: 'About' } },
                  { link: { type: 'custom', url: '/#testimonials', label: 'Testimonials' } },
                  { link: { type: 'custom', url: '/#contact', label: 'Contact' } },
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
                { platform: 'github', url: '#' }
            ]
        }
      });
      console.log('Updated Footer Global');
    }
  }

  console.log('--- Seed complete ---')
}
