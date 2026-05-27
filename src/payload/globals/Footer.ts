import type { GlobalConfig } from "payload";

export const Footer: GlobalConfig = {
  slug: "footer",
  fields: [
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "copyright",
      type: "text",
      defaultValue: "All rights reserved.",
      localized: true,
    },
    {
        name: "socialLinks",
        type: "array",
        fields: [
            {
                name: "platform",
                type: "select",
                options: [
                    { label: "Twitter", value: "twitter" },
                    { label: "Facebook", value: "facebook" },
                    { label: "Instagram", value: "instagram" },
                    { label: "LinkedIn", value: "linkedin" },
                    { label: "GitHub", value: "github" },
                ]
            },
            {
                name: "url",
                type: "text",
                required: true,
            }
        ]
    },
    {
      name: "navItems",
      type: "array",
      maxRows: 6,
      fields: [
        {
          name: "link",
          type: "group",
          fields: [
            {
              name: "type",
              type: "radio",
              options: [
                {
                  label: "Page",
                  value: "reference",
                },
                {
                  label: "Custom URL",
                  value: "custom",
                },
              ],
              defaultValue: "reference",
            },
            {
              name: "reference",
              type: "relationship",
              relationTo: "pages",
              required: true,
              admin: {
                condition: (_, siblingData) => siblingData?.type === "reference",
              },
            },
            {
              name: "url",
              type: "text",
              required: true,
              localized: true,
              admin: {
                condition: (_, siblingData) => siblingData?.type === "custom",
              },
            },
            {
              name: "label",
              type: "text",
              required: true,
              localized: true,
            },
          ],
        },
      ],
    },
  ],
};
