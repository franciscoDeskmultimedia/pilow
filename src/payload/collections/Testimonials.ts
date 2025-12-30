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
    },
    {
      name: "author",
      type: "text",
      required: true,
      label: "Author Name",
    },
    {
      name: "role",
      type: "text",
      required: true,
      label: "Author Role/Title",
    },
    {
      name: "company",
      type: "text",
      required: true,
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
