import { notFound } from "next/navigation";
import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlockRenderer from "@/components/BlockRenderer";
import { getPageBySlug, getAllPages, getServices, getProjects, getTestimonials, getHeader, getFooter } from "@/lib/payload";

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface PayloadDoc {
  id: string | number;
  [key: string]: unknown;
}

// Generate static params for SSG
export async function generateStaticParams() {
  try {
    const pages = await getAllPages();
    return pages
      .filter((page) => !page.isHomepage) // Exclude homepage
      .map((page) => ({
        slug: String(page.slug),
      }));
  } catch {
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const page = await getPageBySlug(slug);
    if (!page) return {};

    return {
      title: (page.metaTitle as string) || (page.title as string),
      description: page.metaDescription as string,
      openGraph: {
        title: (page.metaTitle as string) || (page.title as string),
        description: page.metaDescription as string,
      },
      robots: page.noIndex ? { index: false, follow: false } : undefined,
    };
  } catch {
    return {};
  }
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

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  
  let page, services, projects, testimonials, header, footer;

  try {
    const [pageData, servicesData, projectsData, testimonialsData, headerData, footerData] = await Promise.all([
      getPageBySlug(slug),
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
    notFound();
  }

  if (!page) {
    notFound();
  }

  return (
    <>
      <Header {...header as any} />
      <main id="main-content" role="main">
        {Array.isArray(page.layout) && page.layout.length > 0 ? (
          <BlockRenderer
            blocks={page.layout as never}
            services={services}
            projects={projects}
            testimonials={testimonials}
          />
        ) : (
          <div className="section container">
            <h1 className="section-title">{String(page.title)}</h1>
            <p className="text-pilow-slate">This page has no content blocks yet.</p>
          </div>
        )}
      </main>
      <Footer {...footer as any} />
    </>
  );
}
