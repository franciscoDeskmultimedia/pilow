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
    },
    {
      name: "description",
      type: "textarea",
      required: true,
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
    },
    {
      name: "features",
      type: "array",
      label: "Features",
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
