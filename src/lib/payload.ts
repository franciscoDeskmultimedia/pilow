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
  });
  return header;
}

// Helper to get footer global
export async function getFooter() {
  const payload = await getPayloadClient();
  const footer = await payload.findGlobal({
    slug: "footer",
  });
  return footer;
}

