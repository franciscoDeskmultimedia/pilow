import { getPayload, Where } from "payload";
import config from "@payload-config";
import { draftMode } from "next/headers";

export const getPayloadClient = async () => {
  const payload = await getPayload({
    config,
  });
  return payload;
};

// Helper to get services
export async function getServices() {
  const payload = await getPayloadClient();
  const services = await payload.find({
    collection: "services",
    where: {
      isActive: {
        equals: true,
      },
    } as Where,
    sort: "order",
    limit: 100,
  });
  return services.docs;
}

// Helper to get projects
export async function getProjects(featured?: boolean) {
  const payload = await getPayloadClient();
  
  const where: Where = featured ? { featured: { equals: true } } : {};
  
  const projects = await payload.find({
    collection: "projects",
    where,
    sort: "order",
    limit: 100,
  });
  return projects.docs;
}

// Helper to get testimonials
export async function getTestimonials(featured?: boolean) {
  const payload = await getPayloadClient();
  
  const where: Where = featured ? { featured: { equals: true } } : {};
  
  const testimonials = await payload.find({
    collection: "testimonials",
    where,
    sort: "order",
    limit: 100,
  });
  return testimonials.docs;
}

// Helper to get page by slug
export async function getPageBySlug(slug: string) {
  const { isEnabled: isDraftMode } = await draftMode();
  const payload = await getPayloadClient();
  const pages = await payload.find({
    collection: "pages",
    draft: isDraftMode,
    where: {
      slug: {
        equals: slug,
      },
      ...(isDraftMode
        ? {}
        : {
            status: {
              equals: "published",
            },
          }),
    },
    limit: 1,
  });
  return pages.docs[0] || null;
}

// Helper to get the homepage (page with isHomepage: true)
export async function getHomepagePage() {
  const { isEnabled: isDraftMode } = await draftMode();
  const payload = await getPayloadClient();
  const pages = await payload.find({
    collection: "pages",
    draft: isDraftMode,
    where: {
      isHomepage: {
        equals: true,
      },
      ...(isDraftMode
        ? {}
        : {
            status: {
              equals: "published",
            },
          }),
    },
    limit: 1,
  });
  return pages.docs[0] || null;
}

// Helper to get all published pages (for sitemap/navigation)
export async function getAllPages() {
  const payload = await getPayloadClient();
  const pages = await payload.find({
    collection: "pages",
    where: {
      status: {
        equals: "published",
      },
    },
    limit: 100,
  });
  return pages.docs;
}

// Helper to get global settings
export async function getSettings() {
  const payload = await getPayloadClient();
  const settings = await payload.findGlobal({
    slug: "settings",
  });
  return settings;
}

// Helper to get header global
export async function getHeader() {
  const payload = await getPayloadClient();
  const header = await payload.findGlobal({
    slug: "header",
    depth: 2, // Populate relations like logo
  });
  
  // Transform logo to include url from media relation
  if (header.logo && typeof header.logo === 'object' && 'url' in header.logo) {
    return {
      ...header,
      logo: {
        url: header.logo.url,
        alt: header.logo.alt || 'Logo',
        width: header.logo.width,
        height: header.logo.height,
      }
    };
  }
  
  return header;
}

// Helper to get footer global
export async function getFooter() {
  const payload = await getPayloadClient();
  const footer = await payload.findGlobal({
    slug: "footer",
    depth: 2, // Populate relations like logo
  });
  
  // Transform logo to include url from media relation
  if (footer.logo && typeof footer.logo === 'object' && 'url' in footer.logo) {
    return {
      ...footer,
      logo: {
        url: footer.logo.url,
        alt: footer.logo.alt || 'Logo',
        width: footer.logo.width,
        height: footer.logo.height,
      }
    };
  }
  
  return footer;
}

// Helper to get project by slug
export async function getProjectBySlug(slug: string) {
  const { isEnabled: isDraftMode } = await draftMode();
  const payload = await getPayloadClient();
  const projects = await payload.find({
    collection: "projects",
    draft: isDraftMode,
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  });
  return projects.docs[0] || null;
}

// Helper to get all projects (for static params)
export async function getAllProjects() {
  const payload = await getPayloadClient();
  const projects = await payload.find({
    collection: "projects",
    limit: 100,
  });
  return projects.docs;
}

