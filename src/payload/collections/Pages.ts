import type { CollectionConfig } from "payload";
import { pageBlocks } from "../blocks";

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    group: "Content",
    defaultColumns: ["title", "slug", "isHomepage", "status", "updatedAt"],
    livePreview: {
      url: ({ data, locale }) => {
        let localeCode = 'en';
        if (typeof locale === 'string') {
          localeCode = locale;
        } else if (locale && typeof locale === 'object' && 'code' in locale) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          localeCode = (locale as any).code;
        }

        const path = data?.isHomepage ? "/" : `/${data?.slug || ""}`;
        
        // Force explicit locale to avoid ambiguity
        const fullPath = `/${localeCode}${path === '/' ? '' : path}`;
        
        // Use relative URL to avoid port mismatches during dev
        return `/api/draft?url=${encodeURIComponent(fullPath)}&secret=${process.env.PAYLOAD_SECRET}`;
      },
    },
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Content",
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
              localized: true, // 🌍 Different title per language
            },
            {
              name: "layout",
              type: "blocks",
              label: "Page Builder",
              blocks: pageBlocks,
              // NOTE: layout is NOT localized - same blocks for all languages
              // Text content within blocks IS localized
              admin: {
                description: "Add and arrange sections to build your page",
              },
            },
          ],
        },
        {
          label: "Settings",
          fields: [
            {
              name: "isHomepage",
              type: "checkbox",
              label: "Set as Homepage",
              defaultValue: false,
              admin: {
                description: "Only one page can be the homepage. Setting this will update the homepage.",
              },
            },
            {
              name: "slug",
              type: "text",
              required: true,
              unique: true,
              admin: {
                description: "URL path for this page (e.g., 'about-us' becomes /about-us)",
                condition: (data) => !data?.isHomepage,
              },
              hooks: {
                beforeValidate: [
                  ({ value, data }) => {
                    if (data?.isHomepage) return "home";
                    return value;
                  },
                ],
              },
            },
            {
              name: "status",
              type: "select",
              options: [
                { label: "Draft", value: "draft" },
                { label: "Published", value: "published" },
              ],
              defaultValue: "draft",
              admin: {
                position: "sidebar",
              },
            },
          ],
        },
        {
          label: "SEO",
          fields: [
            {
              name: "metaTitle",
              type: "text",
              label: "Meta Title",
              admin: {
                description: "Overrides the page title for SEO. Leave empty to use page title.",
              },
            },
            {
              name: "metaDescription",
              type: "textarea",
              label: "Meta Description",
              admin: {
                description: "Search engine description (recommended: 150-160 characters)",
              },
            },
            {
              name: "ogImage",
              type: "upload",
              relationTo: "media",
              label: "Social Share Image",
            },
            {
              name: "noIndex",
              type: "checkbox",
              label: "Hide from Search Engines",
              defaultValue: false,
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        // If this page is being set as homepage, unset others
        if (data?.isHomepage && operation === "create") {
          const payload = req.payload;
          await payload.update({
            collection: "pages",
            where: {
              isHomepage: { equals: true },
            },
            data: {
              isHomepage: false,
            },
          });
        }
        return data;
      },
    ],
  },
};
