
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getProjectBySlug, getAllProjects, getHeader, getFooter } from "@/lib/payload";
import ProjectTemplate from "@/components/ProjectTemplate";
import { HeaderProps } from "@/components/Header";
import { FooterProps } from "@/components/Footer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for SSG
export async function generateStaticParams() {
  try {
    const projects = await getAllProjects();
    return projects.map((project) => ({
      slug: String(project.slug),
    }));
  } catch {
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const project = await getProjectBySlug(slug);
    if (!project) return {};

    return {
      title: `${project.title} | Projects`,
      description: project.description as string,
      openGraph: {
        title: project.title as string,
        description: project.description as string,
        images: typeof project.featuredImage === 'object' && project.featuredImage?.url 
          ? [project.featuredImage.url] 
          : undefined,
      },
    };
  } catch {
    return {};
  }
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  
  let project, header, footer;

  try {
    // Fetch all required data in parallel
    const [projectData, headerData, footerData] = await Promise.all([
      getProjectBySlug(slug),
      getHeader().catch(() => null),
      getFooter().catch(() => null),
    ]);
    
    project = projectData;
    header = headerData;
    footer = footerData;
  } catch (e) {
    console.error("Error loading project data:", e);
    notFound();
  }

  if (!project) {
    notFound();
  }

  return (
    <ProjectTemplate 
      project={project} 
      header={header as unknown as HeaderProps} 
      footer={footer as unknown as FooterProps} 
    />
  );
}
