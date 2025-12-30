import type { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
    group: "Content",
    defaultColumns: ["title", "category", "featured", "updatedAt"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        position: "sidebar",
      },
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
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "fullDescription",
      type: "richText",
      label: "Full Description",
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
      required: true,
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
