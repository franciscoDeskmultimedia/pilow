import type { CollectionConfig } from "payload";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: {
    useAsTitle: "author",
    group: "Content",
    defaultColumns: ["author", "company", "featured", "updatedAt"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "content",
      type: "textarea",
      required: true,
      label: "Testimonial Content",
      localized: true, // 🌍 Different testimonial text per language
    },
    {
      name: "author",
      type: "text",
      required: true,
      label: "Author Name",
      // Author name is NOT localized - same name in all languages
    },
    {
      name: "role",
      type: "text",
      required: true,
      label: "Author Role/Title",
      localized: true, // 🌍 Role/title can be translated
    },
    {
      name: "company",
      type: "text",
      required: true,
      // Company name is NOT localized
    },
    {
      name: "avatar",
      type: "upload",
      relationTo: "media",
      label: "Author Photo",
    },
    {
      name: "rating",
      type: "number",
      min: 1,
      max: 5,
      defaultValue: 5,
      required: true,
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
