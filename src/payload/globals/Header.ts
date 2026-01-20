import { GlobalConfig } from "payload";

export const Header: GlobalConfig = {
  slug: "header",
  fields: [
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      required: true,
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
