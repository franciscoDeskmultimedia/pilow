import Header, { HeaderProps } from "@/components/Header";
import Footer, { FooterProps } from "@/components/Footer";
import BlockRenderer from "@/components/BlockRenderer";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import { getHomepagePage, getServices, getProjects, getTestimonials, getHeader, getFooter } from "@/lib/payload";

interface PayloadDoc {
  id: string | number;
  [key: string]: unknown;
}

function transformServices(docs: PayloadDoc[]) {
  return docs.map((doc) => ({
    id: String(doc.id),
    title: String(doc.title || ""),
    description: String(doc.description || ""),
    icon: String(doc.icon || "code"),
    features: Array.isArray(doc.features) ? doc.features : [],
  }));
}

function transformProjects(docs: PayloadDoc[]) {
  return docs.map((doc) => ({
    id: String(doc.id),
    title: String(doc.title || ""),
    category: String(doc.category || "other"),
    description: String(doc.description || ""),
    tags: Array.isArray(doc.tags) ? doc.tags : [],
    projectUrl: doc.projectUrl as string | undefined,
  }));
}

function transformTestimonials(docs: PayloadDoc[]) {
  return docs.map((doc) => ({
    id: String(doc.id),
    content: String(doc.content || ""),
    author: String(doc.author || ""),
    role: String(doc.role || ""),
    company: String(doc.company || ""),
    rating: Number(doc.rating) || 5,
  }));
}

export default async function Home() {
  let page, services, projects, testimonials, header, footer;

  try {
    const [pageData, servicesData, projectsData, testimonialsData, headerData, footerData] = await Promise.all([
      getHomepagePage().catch(() => null),
      getServices().catch(() => []),
      getProjects(true).catch(() => []),
      getTestimonials(true).catch(() => []),
      getHeader().catch(() => null),
      getFooter().catch(() => null),
    ]);
    
    page = pageData;
    services = servicesData.length > 0 ? transformServices(servicesData as PayloadDoc[]) : undefined;
    projects = projectsData.length > 0 ? transformProjects(projectsData as PayloadDoc[]) : undefined;
    testimonials = testimonialsData.length > 0 ? transformTestimonials(testimonialsData as PayloadDoc[]) : undefined;
    header = headerData;
    footer = footerData;
  } catch {
    console.log("Using default content - CMS data not available");
  }

  // If there's a homepage with blocks, render using BlockRenderer
  if (page && Array.isArray(page.layout) && page.layout.length > 0) {
    return (
      <>
        <Header {...(header as unknown as HeaderProps)} />
        <main id="main-content" role="main">
          <BlockRenderer
            blocks={page.layout as never}
            services={services}
            projects={projects}
            testimonials={testimonials}
          />
        </main>
        <Footer {...(footer as unknown as FooterProps)} />
      </>
    );
  }

  // Fallback: Render default homepage with static components
  return (
    <>
      <Header {...(header as unknown as HeaderProps)} />
      <main id="main-content" role="main">
        <Hero />
        <Services services={services} />
        <Portfolio projects={projects} />
        <About />
        <Testimonials testimonials={testimonials} />
        <Contact />
      </main>
      <Footer {...(footer as unknown as FooterProps)} />
    </>
  );
}
