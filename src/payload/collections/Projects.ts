import type { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
    group: "Content",
    defaultColumns: ["title", "category", "featured", "updatedAt"],
    livePreview: {
      url: ({ data, locale }) => {
        let localeCode = 'en';
        if (typeof locale === 'string') {
          localeCode = locale;
        } else if (locale && typeof locale === 'object' && 'code' in locale) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          localeCode = (locale as any).code;
        }

        const path = data?.slug ? `projects/${data.slug}` : 'projects';
        const fullPath = `/${localeCode}/${path}`;
        return `/api/draft?url=${encodeURIComponent(fullPath)}&secret=${process.env.PAYLOAD_SECRET}`;
      },
    },
  },
  versions: {
    drafts: true,
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true, // 🌍 This field can have different values per language
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        position: "sidebar",
      },
      // Note: slug is NOT localized - same URL for all languages
    },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Web Application", value: "web-application" },
        { label: "E-Commerce", value: "e-commerce" },
        { label: "Healthcare", value: "healthcare" },
        { label: "FinTech", value: "fintech" },
        { label: "EdTech", value: "edtech" },
        { label: "Energy", value: "energy" },
        { label: "Other", value: "other" },
      ],
      // Note: category is NOT localized - same selection for all languages
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      localized: true, // 🌍 Different description per language
    },
    {
      name: "fullDescription",
      type: "richText",
      label: "Full Description",
      localized: true, // 🌍 Different rich text content per language
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
      required: true,
      // Note: Images are NOT localized - same image for all languages
    },
    {
      name: "gallery",
      type: "array",
      label: "Project Gallery",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
    {
      name: "tags",
      type: "array",
      label: "Technologies Used",
      localized: true, // 🌍 Tags can be localized if needed
      fields: [
        {
          name: "tag",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "projectUrl",
      type: "text",
      label: "Live Project URL",
      // Note: URL is NOT localized - same link for all languages
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description: "Show on homepage",
      },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: {
        position: "sidebar",
      },
    },
  ],
};
