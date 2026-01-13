import { getPayload, Where } from "payload";
import config from "@payload-config";
import { draftMode } from "next/headers";

// Type for supported locales
type Locale = 'en' | 'es';

export const getPayloadClient = async () => {
  const payload = await getPayload({
    config,
  });
  return payload;
};

// Helper to get services (with locale support)
export async function getServices(locale: Locale = 'en') {
  const payload = await getPayloadClient();
  const services = await payload.find({
    collection: "services",
    locale, // 🌍 Fetch content in the specified language
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

// Helper to get projects (with locale support)
export async function getProjects(featured?: boolean, locale: Locale = 'en') {
  const payload = await getPayloadClient();
  
  const where: Where = featured ? { featured: { equals: true } } : {};
  
  const projects = await payload.find({
    collection: "projects",
    locale, // 🌍 Fetch content in the specified language
    where,
    sort: "order",
    limit: 100,
  });
  return projects.docs;
}

// Helper to get testimonials (with locale support)
export async function getTestimonials(featured?: boolean, locale: Locale = 'en') {
  const payload = await getPayloadClient();
  
  const where: Where = featured ? { featured: { equals: true } } : {};
  
  const testimonials = await payload.find({
    collection: "testimonials",
    locale, // 🌍 Fetch content in the specified language
    where,
    sort: "order",
    limit: 100,
  });
  return testimonials.docs;
}

// Helper to get page by slug (with locale support)
export async function getPageBySlug(slug: string, locale: Locale = 'en') {
  const { isEnabled: isDraftMode } = await draftMode();
  const payload = await getPayloadClient();
  const pages = await payload.find({
    collection: "pages",
    locale, // 🌍 Fetch content in the specified language
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

// Helper to get the homepage (with locale support)
export async function getHomepagePage(locale: Locale = 'en') {
  const { isEnabled: isDraftMode } = await draftMode();
  const payload = await getPayloadClient();
  const pages = await payload.find({
    collection: "pages",
    locale, // 🌍 Fetch content in the specified language
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

// Helper to get all published pages
export async function getAllPages(locale: Locale = 'en') {
  const payload = await getPayloadClient();
  const pages = await payload.find({
    collection: "pages",
    locale,
    where: {
      status: {
        equals: "published",
      },
    },
    limit: 100,
  });
  return pages.docs;
}

// Helper to get global settings (with locale support)
export async function getSettings(locale: Locale = 'en') {
  const payload = await getPayloadClient();
  const settings = await payload.findGlobal({
    slug: "settings",
    locale,
  });
  return settings;
}

// Helper to get header global (with locale support)
export async function getHeader(locale: Locale = 'en') {
  const payload = await getPayloadClient();
  const header = await payload.findGlobal({
    slug: "header",
    locale,
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

// Helper to get footer global (with locale support)
export async function getFooter(locale: Locale = 'en') {
  const payload = await getPayloadClient();
  const footer = await payload.findGlobal({
    slug: "footer",
    locale,
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

// Helper to get project by slug (with locale support)
export async function getProjectBySlug(slug: string, locale: Locale = 'en') {
  const { isEnabled: isDraftMode } = await draftMode();
  const payload = await getPayloadClient();
  const projects = await payload.find({
    collection: "projects",
    locale,
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

// Helper to get all projects (for static params - no locale needed)
export async function getAllProjects() {
  const payload = await getPayloadClient();
  const projects = await payload.find({
    collection: "projects",
    limit: 100,
  });
  return projects.docs;
}
