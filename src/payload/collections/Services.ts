import type { CollectionConfig } from "payload";

export const Services: CollectionConfig = {
  slug: "services",
  admin: {
    useAsTitle: "title",
    group: "Content",
    defaultColumns: ["title", "order", "updatedAt"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true, // 🌍 Different title per language
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      localized: true, // 🌍 Different description per language
    },
    {
      name: "icon",
      type: "select",
      required: true,
      options: [
        { label: "Code", value: "code" },
        { label: "Palette", value: "palette" },
        { label: "Shopping Cart", value: "cart" },
        { label: "Computer", value: "computer" },
        { label: "Mobile", value: "mobile" },
        { label: "Lightning", value: "lightning" },
        { label: "Database", value: "database" },
        { label: "Cloud", value: "cloud" },
      ],
      defaultValue: "code",
      // Icon is NOT localized - same icon for all languages
    },
    {
      name: "features",
      type: "array",
      label: "Features",
      localized: true, // 🌍 Different features per language
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: "feature",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: {
        position: "sidebar",
        description: "Lower numbers appear first",
      },
    },
    {
      name: "isActive",
      type: "checkbox",
      defaultValue: true,
      admin: {
        position: "sidebar",
      },
    },
  ],
};
